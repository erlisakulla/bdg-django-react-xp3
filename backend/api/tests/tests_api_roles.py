from django.test import TestCase

from api.models import Game, User, Week, Role
from rest_framework.test import APITestCase
import json

# Create your tests here.
from rest_framework.test import APIRequestFactory

from rest_framework.test import APITestCase


class GameRoleAPItest(APITestCase):
    roleurl = '/api/role/'

    def setUp(self):
        self.instructor = User.objects.create(
            email='inst@gmail.com', name="Inst", password="whatever111", is_instructor=True)
        self.instructor2 = User.objects.create(
            email='inst2@gmail.com', name="Inst", password="whatever111", is_instructor=True)
        self.player = User.objects.create(
            email='player@gmail.com', name="Play", password="whatever111")

        self.player2 = User.objects.create(
            email='player2@gmail.com', name="Play", password="whatever111")
        self.game1 = Game.objects.create(session_length=22, distributorPresent=True,
                                         wholesalerPresent=False, instructor=self.instructor2, starting_inventory=5)

    def test_check_role_noauth(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]

        # self.client.force_authenticate(user=self.instructor2)
        response = self.client.get(self.roleurl+str(onerole.pk)+'/')
        self.assertEqual(401, response.status_code)

    def test_check_role_registeration_byinstructor(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]
        self.client.force_authenticate(user=self.instructor2)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})
        self.assertEqual(406, response.status_code)

    def test_check_role_registeration_byplayer(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]
        self.client.force_authenticate(user=self.player)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})
        self.assertEqual(200, response.status_code)

        # register again not possible
        self.client.force_authenticate(user=self.player2)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})
        self.assertEqual(406, response.status_code)

    def test_weekview_no_permission(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]
        self.client.force_authenticate(user=self.player)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})

        #not authorized
        self.client.force_authenticate(user=self.player2)
        response = self.client.get(
            self.roleurl+str(onerole.pk)+'/getweek/')
        self.assertEqual(401, response.status_code)

    def test_weekview_with_permission(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]
        self.client.force_authenticate(user=self.player)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})

        self.assertEqual(200, response.status_code)

    def test_post_order_before(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]
        self.client.force_authenticate(user=self.player)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})

        # first check not ordered
        response = self.client.get(
            self.roleurl+str(onerole.pk)+'/',)

        self.assertEqual(False, response.data["ordered"])

    def test_post_order_after(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]
        self.client.force_authenticate(user=self.player)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})
        # register first and post order
        response = self.client.post(
            self.roleurl+str(onerole.pk)+'/orderbeer/', {"quantity": 5})
        # after order
        self.assertEqual(200, response.status_code)
        response = self.client.get(
            self.roleurl+str(onerole.pk)+'/',)
        self.assertEqual(True, response.data["ordered"])
        # order again not allowed
        response = self.client.post(
            self.roleurl+str(onerole.pk)+'/orderbeer/', {"quantity": 10})
        # after order
        self.assertEqual(429, response.status_code)

    def test_post_order_in_database(self):
        roles = self.game1.gameroles.all()
        onerole = roles[0]
        self.client.force_authenticate(user=self.player)
        response = self.client.patch(
            self.roleurl+str(onerole.pk)+'/register/', {})
        # register first and post order
        response = self.client.post(
            self.roleurl+str(onerole.pk)+'/orderbeer/', {"quantity": 5})
        self.assertEqual(200, response.status_code)
        # data updated on week database
        week = onerole.roleweeks.filter(
            number=self.game1.rounds_completed+1).first()
        self.assertEqual(5, week.order_placed)
