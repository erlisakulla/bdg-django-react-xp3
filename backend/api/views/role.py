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



# =======================ROLE RELATED VIEWS ==========================

# viewsets hadnling multiple routes
# starting from /api/role
# /api/role/{roleid} -GET
# /api/role/{roleid}/register -patch

class roleview(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Role.objects.all()

    def get_serializer_class(self):
        if self.action == 'orderbeer':  # post body with quantity
            return OrderSerializer
        if self.action == 'register':  # no patch body required for validation
            return NullSerializer
        if self.action == 'getweek':
            return WeekSerializer
        return RoleSerializer

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
    @swagger_auto_schema(operation_description="For Ordering Beer")
    def orderbeer(self, request, pk=None):
        user = request.user
        role = self.get_object()
        if not role.associatedGame.active:
            return Response({'detail': 'Game Frozen/Not Active'}, status=status.HTTP_423_LOCKED)

        if role.playedBy == user:  # if not registered for game no access
            serializd = OrderSerializer(data=request.data)

            if serializd.is_valid():
                roundcompleted = role.associatedGame.rounds_completed
                currentweek = role.roleweeks.all().filter(
                    number=roundcompleted+1).first()  # reverse foreignkey lookup
                if role.ordered:
                    return Response({'detail': 'Order Already Placed'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
                currentweek.order_placed = serializd.data['quantity']
                currentweek.save()
                role.ordered = True
                role.save()
                return Response({"detail": "Success"})

            else:  # if not valid input input<=0
                return Response(serializd.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
        else:  # if no permission
            return Response({"detail": "Not Authorized"}, status=status.HTTP_401_UNAUTHORIZED)


##################### INFO SHARING ##########################

    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Returns Other Player Info", responses={200: ""})
    def getsharedinfo(self, request, pk=None):
        role = self.get_object()
        game = role.associatedGame
        if role.playedBy != request.user and  request.user!=game.instructor:
            return Response({"detail": "No Permission for this Role."}, status=status.HTTP_403_FORBIDDEN)
  
        if game.info_sharing or request.user==game.instructor:
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


    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Returns Player Current Cost ",
                         responses={200: "Players Cost", 403: "Not authorized"})

    def monitor(self, request, pk=None):
        role = self.get_object()
        game=role.associatedGame
        roles = game.gameroles.all() #all roles

        if role.playedBy == request.user :
            tosend = {}
            tosend['game_id'] = game.pk #primarykey
            tosend['info_delay'] = game.info_delay
            tosend['session_length'] = game.session_length
            tosend['current_week'] = game.rounds_completed+1
            tosend['holding_cost'] = game.holding_cost
            tosend['backlog_cost'] = game.backlog_cost
            tosend['info_sharing'] = game.info_sharing
            tosend['cost'] = {}
            totalcost = 0
            if not game.info_sharing: #if infosharing get all
                roles=[role] #only include own role.

            for role in roles:
                getcurrentweek = role.roleweeks.get(
                    number=game.rounds_completed+1)
                tosend["cost"][role.roleName] = getcurrentweek.cost
                totalcost += getcurrentweek.cost

            tosend["cost"]['total'] = totalcost

            return Response(tosend)
        return Response({"detail": "Not authorized for this role"}, status=status.HTTP_403_FORBIDDEN)


    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="CurrentWeek all details", responses={200: "CurrentWeek all details"})
    def currentweek(self, request, pk=None):
        role = self.get_object()
        if role.playedBy == request.user:

            upstream = role.upstreamPlayer
            downstream = role.downstreamPlayer
            upstreamname = "Brewery"
            downstreamname = "Consumer"
            if upstream:
                upstreamname = upstream.roleName
            if downstream:
                downstreamname = downstream.roleName

            game = role.associatedGame
            alldetail = {}
            thisweek = role.roleweeks.get(number=game.rounds_completed+1)
            alldetail['weeknumber'] = thisweek.number
            alldetail['beginning_inventory'] = thisweek.inventory + \
                thisweek.outgoing_shipment
            alldetail['incoming_shipment'] = thisweek.incoming_shipment
            alldetail['demand'] = thisweek.demand
            alldetail['backorder'] = thisweek.outgoing_shipment - \
                thisweek.demand + thisweek.backlog
            alldetail['outgoing_shipment'] = thisweek.outgoing_shipment
            alldetail['ending_inventory'] = thisweek.inventory
            alldetail['upstream'] = upstreamname
            alldetail['downstream'] = downstreamname
            alldetail['name'] = role.roleName

            return Response(alldetail)
        return Response({"detail": "Not Authroized"}, status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Checks other players order status", responses={200: "Ready", 401: "Not Ready/ Unauthorized"})
    def nextroundstatus(self, request, pk=None):
        user = request.user
        role = self.get_object()
        if role.playedBy == user:  # if not registered for game, no access
            game = role.associatedGame
            roles = game.gameroles.all()
            for roleiter in roles:
                if not roleiter.ordered:  # all players should order
                    return Response({"detail": "Not ready Yet. Every Player Must Order First"}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({"detail": "Week Ready. Reload "})
        else:
            return Response({"detail": "Not Registered for this Role"}, status=status.HTTP_401_UNAUTHORIZED)

    # for /api/role/{roleid}/getweek

    @action(detail=True, methods=['get'])
    @swagger_auto_schema(operation_description="Checks other players order status")
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
