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



# =======================USER RELATED VIEWS ==========================

        
# =======================USER RELATED VIEWS ==========================

# For Route /api/user
# Returns user details name ,email,role


class userview(APIView):
    """
    Displays User Info
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    @swagger_auto_schema(operation_description="Returns Logged in user info")
    def get(self, request, format="json"):
        serialized = UserSerializer(request.user)
        return Response(serialized.data, status=status.HTTP_200_OK)


# For Route /api/user/changepassword/ < post
class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            self.object.set_password(request.data['password'])
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# for route /api/create
# only post method allowed for register

class registerview(generics.CreateAPIView):
    """
    Register new user
    """
    serializer_class = UserSerializer