from django.shortcuts import render
from rest_framework import viewsets
from .models import Game
from .serializers import GameSerializer
# Create your views here.


class gameview(viewsets.ModelViewSet):
        queryset = Game.objects.all()
        serializer_class = GameSerializer