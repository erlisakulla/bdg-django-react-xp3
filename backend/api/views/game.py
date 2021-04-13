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
from api.models import Game, User, Role, Week
from api.serializers import GameSerializer, UserSerializer, RoleSerializer, WeekSerializer, OrderSerializer, NullSerializer, ChangePasswordSerializer
# Create your views here.
from drf_yasg.utils import swagger_auto_schema

import random

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




# For all routes api/game/
#  /game/{gameid}
#   /game/{gameid}/getroles - fetch availiable roles
#  /game/{gameid}/getweek - fetch weeks for user in current role.


class gameview(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated,
                          GameCreatePermission, GameUserWritePermission]

    # JUST HANDY FOR SWAGGER API VIEW
    def get_serializer_class(self):
        if self.action == 'toggleactive':  # post body with quantity
            return NullSerializer
        if self.action == 'getroles':
            return RoleSerializer
        if self.action == 'toggleactive':  # JUST HANDY FOR SWAGGER API VIEW
            return NullSerializer
        if self.action == 'getsharedinfo':
            return NullSerializer
        if self.action == 'monitor':
            return NullSerializer
        return GameSerializer

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

    @action(detail=True, methods=['post'])
    # api/game/{gameid}/toggleactive #FOR FREEZING GAME
    @swagger_auto_schema(operation_description="Toggles Active attribute for game", responses="")
    def toggleactive(self, request, pk=None):
        game = self.get_object()
        game.active = not game.active
        game.save()
        if game.active:
            return Response({"detail": "game activated", "active": game.active})

        return Response({"detail": "game deactivated", "active": game.active})

    @action(detail=True, methods=['get'])
    # get availiable roles #free roles
    # api/game/{gameid}/getroles
    @swagger_auto_schema(operation_description="Returns All Availiable Roles", responses={200: "Availiable Roles"})
    def getroles(self, request, pk=None):
        game = self.get_object()
        roles = game.gameroles.all().filter(playedBy=None)
        serialize = RoleSerializer(roles, many=True)
        return Response(serialize.data)

    # for infosharing data
    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Returns all Player Status if infosharing enabled",
                         responses={200: "Other Players Info", 403: "Unauthorized"})
    def getsharedinfo(self, request, pk=None):
        game = self.get_object()
        if request.user!=game.instructor:
            return Response({"detail": "No Permission for this Game."}, status=status.HTTP_403_FORBIDDEN)
  
        if game.info_sharing or request.user!=game.instructor:
            roles = game.gameroles.all()
            alldetail = []
            for role in roles:
                playedby = None
                if role.playedBy:
                    playedby = role.playedBy.name
                alldetail.append({"Role": role.roleName, "RoleID": role.pk,
                                  "OrderPlaced": role.ordered, 'PlayedBy': playedby})

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

    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Returns Player Current Cost ",
                         responses={200: "Players Cost", 403: "Not a Game Creator"})

    def monitor(self, request, pk=None):
        game = self.get_object()
        if game.instructor == request.user :
            tosend = {}
            tosend['game_id'] = game.pk #primarykey
            tosend['info_delay'] = game.info_delay
            tosend['session_length'] = game.session_length
            tosend['current_week'] = game.rounds_completed+1
            tosend['holding_cost'] = game.holding_cost
            tosend['backlog_cost'] = game.backlog_cost
            tosend['info_sharing'] = game.info_sharing
            tosend['cost'] = {}
            roles = game.gameroles.all()
            totalcost = 0
            for role in roles:
                getcurrentweek = role.roleweeks.get(
                    number=game.rounds_completed+1)
                tosend["cost"][role.roleName] = getcurrentweek.cost
                totalcost += getcurrentweek.cost
            tosend["cost"]['total'] = totalcost

            return Response(tosend)
        return Response({"detail": "Not a Game Creator"}, status=status.HTTP_403_FORBIDDEN)
