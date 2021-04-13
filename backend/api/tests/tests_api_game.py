from django.test import TestCase

from api.models import Game, User, Week, Role
from rest_framework.test import APITestCase
import json

# Create your tests here.
from rest_framework.test import APIRequestFactory

from rest_framework.test import APITestCase


class GameApiTest(APITestCase):
    gameurl = '/api/game/'
    def setUp(self):
        self.instructor = User.objects.create(
            email='inst@gmail.com', name="Inst", password="whatever111", is_instructor=True)
        self.instructor2 = User.objects.create(
            email='inst2@gmail.com', name="Inst", password="whatever111", is_instructor=True)
        self.player = User.objects.create(
            email='player@gmail.com', name="Play", password="whatever111")
        self.game1 = Game.objects.create(session_length=22, distributorPresent=True,
                                         wholesalerPresent=False, instructor=self.instructor2, starting_inventory=5)

    def test_game_creation_instructor_missing_required_field(self):
        """
        Test to verify that a post call to create a new game.
        missing fields
        """
        self.client.force_authenticate(user=self.instructor)
        game_data = {

            # "session_length": 5,
            "distributorPresent": True,
            "wholesalerPresent": True,
            "active": True,
            "info_sharing": True,
            "info_delay": 0,
            "holding_cost": 0,
            "backlog_cost": 0,
            "isDefaultGame": True,
            "starting_inventory": 0

        }
        response = self.client.post(self.gameurl, game_data)
        self.assertEqual(406, response.status_code)

    def test_game_creation_instructor(self):
        """
        Test to verify that a post call to create a new game.
        """
        self.client.force_authenticate(user=self.instructor)
        game_data = {

            "session_length": 5,
            "distributorPresent": True,
            "wholesalerPresent": True,
            "active": True,
            "info_sharing": True,
            "info_delay": 0,
            "holding_cost": 0,
            "backlog_cost": 0,
            "isDefaultGame": True,
            "starting_inventory": 0

        }
        response = self.client.post(self.gameurl, game_data)
        self.assertEqual(200, response.status_code)

    def test_game_edit_another_instructor(self):
        """
        Test to verify that a patch call to edit game
        """
        self.client.force_authenticate(user=self.instructor)
        response = self.client.patch(
            self.gameurl+str(self.game1.pk)+'/', {"session_length": 10})
        self.assertEqual(403, response.status_code)

    def test_game_edit_verified_instructor(self):
        """
        Test to verify that a patch call to edit game(valid)
        """
        self.client.force_authenticate(user=self.instructor2)

        response = self.client.patch(
            self.gameurl+str(self.game1.pk)+'/', {"session_length": 10})
        self.assertEqual(200, response.status_code)

    def test_game_monitor_page(self):
        """
        Test to verify that monitorpage works
        """
        self.client.force_authenticate(user=self.instructor2)

        response = self.client.get(
            self.gameurl+str(self.game1.pk)+'/monitor/')
        self.assertEqual(200, response.status_code)

        self.client.force_authenticate(user=self.instructor)
        response = self.client.get(
            self.gameurl+str(self.game1.pk)+'/monitor/')
        self.assertEqual(403, response.status_code)

    def test_game_getroles_work(self):
        """
        Test to verify that getroles work
        """
            #no auth
        #self.client.force_authenticate(user=self.instructor)
        response = self.client.get(
            self.gameurl+str(self.game1.pk)+'/getroles/')
        self.assertEqual(401, response.status_code)

        self.client.force_authenticate(user=self.player)
        response = self.client.get(
            self.gameurl+str(self.game1.pk)+'/getroles/')
        self.assertEqual(200, response.status_code)