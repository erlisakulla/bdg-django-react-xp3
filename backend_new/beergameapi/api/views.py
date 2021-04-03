from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
import json
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.renderers import JSONRenderer

from .models import Game,User,Role,Week
from .serializers import GameSerializer,UserSerializer,RoleSerializer,WeekSerializer
# Create your views here.

# For route api/game/ 
class gameview(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @action(detail=True, methods=['get'])
    #get availiable roles #free roles
    def getroles(self, request, pk=None):
        game = self.get_object()
        roles=game.gameroles.all().filter(playedBy=None)
        serialize= RoleSerializer(roles,many=True)
        return Response(serialize.data) 

    @action(detail=True, methods=['get'])
    def getweek(self, request, pk=None):
        game = self.get_object()

        try:
            role=game.gameroles.get(playedBy=self.request.user)
            if role:
                print("HERE DEBUG")
                weeks= role.roleweeks.all()
                serialize= WeekSerializer(weeks,many=True)
                return Response(serialize.data)
                return Response(serialize.error)
        except:  
            return Response({"detail":"Not Registered for this Game"},status=status.HTTP_404_NOT_FOUND)



#For Route /api/user
class userview(APIView):

    def get(self,request,format="json"):
        serialized=UserSerializer(request.user)
        return Response(serialized.data,status=status.HTTP_200_OK)

#for route /api/create
class registerview(generics.CreateAPIView):
    serializer_class = UserSerializer

