from django.test import TestCase

from .models import Game,User,Week,Role
from rest_framework.test import APITestCase


#====================USER RELATED TEST ===========
#USER CREATION TEST
class UserTest(TestCase):
    """ Test module for User model """

    def setUp(self):
        User.objects.create(
            email='yahoo@gmail.com', name="ok", password="whatever111")

    def test_user(self):
        userok = User.objects.get(name='ok')
        self.assertEqual(
            userok.email, "yahoo@gmail.com")


#====================GAME RELATED TEST ===========
#BASIC GAME CREATION TEST
class gameTest(TestCase):
    """ Test module for Game model """
    def setUp(self):
        cuser= User.objects.create(
            email='yahoo@gmail.com', name="ok", password="whatever111",is_instructor=True)
        Game.objects.create(session_length=55, distributorPresent=True,wholesalerPresent=True,instructor=cuser)
        Game.objects.create(session_length=22, distributorPresent=True,wholesalerPresent=False,instructor=cuser)

    def test_game(self):
        userok = User.objects.get(email='yahoo@gmail.com')
        gameok = Game.objects.get(instructor=userok)
        self.assertEqual(
            gameok.session_length, 55)

    def test_role_creation(self): #automatic role creation
        gameok = Game.objects.get(session_length=55)
        roles=gameok.gameroles.all()
        self.assertEqual(len(roles), 4) #all player present
    
    def test_role_creation_two(self): #automatic role creation
        gameok = Game.objects.get(session_length=22)
        roles=gameok.gameroles.all()
        self.assertEqual(len(roles), 3) #all player present