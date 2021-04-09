from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
import json
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAdminUser, IsAuthenticated, SAFE_METHODS, DjangoModelPermissions, BasePermission
from .models import Game, User, Role, Week
from .serializers import GameSerializer, UserSerializer, RoleSerializer, WeekSerializer, OrderSerializer,NullSerializer
# Create your views here.


# =======================GAME RELATED CUSTOM PERMISSIONS ==========================


# permission to edit the game : only by instructor
class GameUserWritePermission(BasePermission):
    message = "editing only by the instructor "

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.instructor == request.user


# creation possible by only instructor
class GameCreatePermission(BasePermission):
    message = "creating only by the instructor "

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_instructor


# =======================USER RELATED VIEWS ==========================


# For all routes api/game/
#  /game/{gameid}
#   /game/{gameid}/getroles - fetch availiable roles
#  /game/{gameid}/getweek - fetch weeks for user in current role.


class gameview(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated,
                          GameCreatePermission, GameUserWritePermission]
    serializer_class = GameSerializer
    queryset = Game.objects.all()

    # list all game filtered to logged in user
    def list(self, request):
        queryset = Game.objects.all().filter(instructor=request.user)
        serializer = GameSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        user = request.user
        serializer = GameSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save(instructor=user)
            return Response(serializer.data)
        return Response(serializer.error)

        # retrieve for each game
    def retrieve(self, request, pk=None):
        queryset = Game.objects.all()
        game = get_object_or_404(queryset, pk=pk)
        serializer = GameSerializer(game)
        return Response(serializer.data)

    # +++ CUSTOM URLS +++
    # for /api/game/all -GET -returns all created games -no authrequired
    @action(detail=False)
    def all(self, request):
        allgame = Game.objects.all()

        serialized = GameSerializer(allgame, many=True)
        return Response(serialized.data)

    @action(detail=True, methods=['get'])
    # get availiable roles #free roles
    # api/game/{gameid}/getroles
    def getroles(self, request, pk=None):
        game = self.get_object()
        roles = game.gameroles.all().filter(playedBy=None)
        serialize = RoleSerializer(roles, many=True)
        return Response(serialize.data)

    # for infosharing data
    @action(detail=True, methods=['get'])
    def getsharedinfo(self, request, pk=None):

        
        game = self.get_object()

        try:  # reverse lookup
            role = game.gameroles.get(playedBy=self.request.user)
        except:
            return Response({"detail": "Not Registered for this Game"}, status=status.HTTP_403_FORBIDDEN)

        if game.info_sharing:
            roles = game.gameroles.all()
            alldetail = []
            for role in roles:
                playedby=None
                if role.playedBy:
                    playedby=role.playedBy.name
                alldetail.append({"Role":role.roleName, "OrderPlaced":role.ordered,'PlayedBy':playedby,'nextround':role.gonext})
            #serialize = RoleSerializer(roles, many=True)

            return Response(alldetail)
        return Response({"detail": "info sharing disabled"}, status=status.HTTP_403_FORBIDDEN)

    # get availiable roles #free roles
    # api/game/{gameid}/getroles

    # api/game/{gameid}/getweek
    @action(detail=True, methods=['get'])
    def getweeks(self, request, pk=None):
        game = self.get_object()
        try:  # reverse lookup
            role = game.gameroles.get(playedBy=self.request.user)
            if role:                # reverse lookup using relatedname
                weeks = role.roleweeks.all()
                serialize = WeekSerializer(weeks, many=True)
                return Response(serialize.data)
        except:
            return Response({"detail": "Not Registered for this Game"}, status=status.HTTP_403_FORBIDDEN)


# =======================USER RELATED VIEWS ==========================

# For Route /api/user
# Returns user details name ,email,role
class userview(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format="json"):
        serialized = UserSerializer(request.user)
        return Response(serialized.data, status=status.HTTP_200_OK)


# for route /api/create
# only post method allowed for register

class registerview(generics.CreateAPIView):
    serializer_class = UserSerializer





# =======================ROLE RELATED VIEWS ==========================

# viewsets hadnling multiple routes
# starting from /api/role
# /api/role/{roleid} -GET
# /api/role/{roleid}/register -patch

class roleview(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Role.objects.all()

    def get_serializer_class(self):
        if self.action == 'orderbeer': #post body with quantity
            return OrderSerializer
        if self.action =='gonext': #no post body required for validation
            return NullSerializer
        if self.action =='register': #no patch body required for validation
            return NullSerializer
        return RoleSerializer #

    # for route /api/role
    # returns active registered roles.
    def list(self, request):
        user = request.user
        queryset = user.playerrole.all()
        serialized = RoleSerializer(queryset, many=True)
        return Response(serialized.data)

    # +++ CUSTOM URLS +++

    # for route /api/role/{roleid}/register
    # only patch update playedby field.

    @action(detail=True, methods=['post'])
    def orderbeer(self, request, pk=None):
        user = request.user
        role = self.get_object()
        if role.playedBy == user:  # if not registered for game no access
            serializd = OrderSerializer(data=request.data)

            if serializd.is_valid():
                roundcompleted = role.associatedGame.rounds_completed
                currentweek = role.roleweeks.all().filter(
                    number=roundcompleted+1).first()  # reverse foreignkey lookup
                if role.ordered:
                    return Response({'detail': 'Order Already Placed'}, status=status.HTTP_406_NOT_ACCEPTABLE)
                currentweek.order_placed = serializd.data['quantity']
                currentweek.save()
                role.ordered=True
                role.save()
                return Response({"detail": "Success"})

            else:  # if not valid input input<=0
                return Response(serializd.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:  # if no permission
            return Response({"detail": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)



    @action(detail=True, methods=['post'])
    def gonext(self, request,pk=None):
        user = request.user
        role = self.get_object()
        if role.playedBy == user:  # if not registered for game, no access
            game=role.associatedGame;
            roles = game.gameroles.all()
            for roleiter in roles:
                if not roleiter.ordered: #all players should order
                    return Response({"detail":"all player not ready"},status=status.HTTP_403_FORBIDDEN)

        
            #if all players have ordered
            role.gonext=True
            return Response({"detail":"success"})
        else:
            return Response({"detail": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)



    @action(detail=True, methods=['get'])
    def getsharedinfo(self, request, pk=None):
        role = self.get_object()
        game = role.associatedGame
        if game.info_sharing:
            roles = game.gameroles.all()
            alldetail = []
            for role in roles:
                playedby=None
                if role.playedBy:
                    playedby=role.playedBy.name
                alldetail.append({"Role":role.roleName, "OrderPlaced":role.ordered,'PlayedBy':playedby,'nextround':role.gonext})

            return Response(alldetail)
        return Response({"detail": "info sharing disabled"}, status=status.HTTP_403_FORBIDDEN)


    # for /api/role/{roleid}/getweek
    @action(detail=True, methods=['get'])
    def getweek(self, request, pk=None):
        user = request.user
        role = self.get_object()
        weeks = role.roleweeks.all()
        if role.playedBy == user:  # if not registered for game, no access
            serializd = WeekSerializer(weeks, many=True)
            return Response(serializd.data)
        else:
            return Response({"detail": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)

    # for /api/role/{roleid}/register
    # register yourself to that role
    @action(detail=True, methods=['patch'])
    def register(self, request, pk=None):
        user = request.user
        role = self.get_object()
        if user.is_instructor:
            return Response({"detail": "Only a Player can Join a Game"}, status=status.HTTP_406_NOT_ACCEPTABLE)

        if(role.playedBy):
            return Response({"detail": "Role already assigned to a Player"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        serialized = RoleSerializer(
            role, data={"playedBy": user.id}, partial=True)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)
        else:
            return Response(serialized.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
