from django.test import TestCase

from api.models import Game,User,Week,Role
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
        user1=User.objects.create(
            email='yahoo@gmail.com', name="ok", password="whatever111",is_instructor=True)

        user2=User.objects.create(
            email='yahoo1@gmail.com', name="ok1", password="whatever111",is_instructor=True)
        Game.objects.create(session_length=55, distributorPresent=True,wholesalerPresent=True,instructor=user1)
        Game.objects.create(session_length=22, distributorPresent=True,wholesalerPresent=False,instructor=user2,starting_inventory=5)

    def test_game(self):
        userok = User.objects.get(email='yahoo@gmail.com')
        gameok = Game.objects.get(instructor=userok)
        self.assertEqual(
            gameok.session_length, 55)

    def test_role_creation(self): #automatic role creation
        user1 = User.objects.get(email='yahoo@gmail.com')
        gameok = Game.objects.get(instructor=user1)
        roles=gameok.gameroles.all()
        self.assertEqual(len(roles), 4) #all player present
    
    def test_role_creation_two(self): #automatic role creation 
        user2 = User.objects.get(email='yahoo1@gmail.com')
        gameok = Game.objects.get(instructor=user2)
        roles=gameok.gameroles.all()
        self.assertEqual(len(roles), 3) #all player present

    def test_week_creation(self): #check for week creation and starting inventory
        user2 = User.objects.get(email='yahoo1@gmail.com')
        gameok = Game.objects.get(instructor=user2)
        roles=gameok.gameroles.all()
        for role in roles:
            week1= role.roleweeks.all().first()
            self.assertEqual(week1.inventory, gameok.starting_inventory)
            