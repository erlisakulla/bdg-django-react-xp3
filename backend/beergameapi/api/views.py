from django.shortcuts import render,get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
import json
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets, mixins

from .models import Game, User, Role, Week
from .serializers import GameSerializer, UserSerializer, RoleSerializer, WeekSerializer
# Create your views here.

# For all routes api/game/
#  /game/{gameid}
#   /game/{gameid}/getroles - fetch availiable roles
#  /game/{gameid}/getweek - fetch weeks for user in current role.


class gameview(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @action(detail=True, methods=['get'])
    # get availiable roles #free roles
    def getroles(self, request, pk=None):
        game = self.get_object()
        roles = game.gameroles.all().filter(playedBy=None)
        serialize = RoleSerializer(roles, many=True)
        return Response(serialize.data)

    @action(detail=True, methods=['get'])
    def getweek(self, request, pk=None):
        game = self.get_object()

        try:  # reverse lookup
            role = game.gameroles.get(playedBy=self.request.user)
            if role:
                print("HERE DEBUG")
                # reverse lookup using relatedname
                weeks = role.roleweeks.all()
                serialize = WeekSerializer(weeks, many=True)
                return Response(serialize.data)
        except:
            return Response({"detail": "Not Registered for this Game"}, status=status.HTTP_403_FORBIDDEN)


# For Route /api/user
# Returns user details name ,email,role
class userview(APIView):

    def get(self, request, format="json"):
        serialized = UserSerializer(request.user)
        return Response(serialized.data, status=status.HTTP_200_OK)


# for route /api/create
# only post method allowed for register

class registerview(generics.CreateAPIView):
    serializer_class = UserSerializer




class roleregister(generics.RetrieveUpdateAPIView):
    queryset= Role.objects.all()
    serializer_class= RoleSerializer
    lookup_field='pk'
    lookup_field_kwarg='pk'

#viewsets hadnling multiple routes
# starting from /api/role
# /api/role/{roleid} -GET 
# /api/role/{roleid}/register -patch 

class roleview(mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

    #for route /api/role
    #returns active registered roles. 
    def list(self, request):
        user=request.user
        queryset=user.playerrole.all()
        serialized = RoleSerializer(queryset,many=True)
        return Response(serialized.data)

    #for route /api/role/{roleid}/register
    # only patch update playedby field.

    # def partial_update(request, *args, **kwargs):

    # def perform_update(self,serializer):
    #     pass

    @action(detail=True, methods=['patch'])
    def register(self, request, pk=None):
        role = self.get_object()
        if(role.playedBy):
            return Response({"detail":"Role already assigned to a Player"},status=status.HTTP_406_NOT_ACCEPTABLE)
        serialized=RoleSerializer(role,data={"playedBy":request.user.id},partial=True)
        if(serialized.is_valid()):
            serialized.save()
            return Response(serialized.data)

        return Response({"detail": "Only one Role per Game Allowed"},status=status.HTTP_406_NOT_ACCEPTABLE)