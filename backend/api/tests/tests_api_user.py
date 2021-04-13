from django.test import TestCase
from rest_framework.authtoken.models import Token

from api.models import Game,User,Week,Role
from rest_framework.test import APITestCase
import json

# Create your tests here.
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from rest_framework.test import APITestCase

class UserTest(TestCase):
    """ Test module for Game model """

    def setUp(self):
        User.objects.create(
            email='yahoo@gmail.com', name="ok", password="whatever111")

    def test_user(self):
        userok = User.objects.get(name='ok')
        self.assertEqual(
            userok.email, "yahoo@gmail.com")
      

class UserRegistrationAPIViewTestCase(APITestCase):
    urlreg = '/api/register/'
    def test_missing_password(self):
        """
        Test to verify that a post call with missing passwords
        """
        user_data = {
            "name": "testuser",
            "email": "test@testuser.com",
        }
        response = self.client.post(self.urlreg, user_data)
        self.assertEqual(400, response.status_code)

    def test_user_registration(self):
        """
        Test to verify that a post call with user valid data
        """
        user_data = {
            "name": "someone",
            "email": "test@testuser.com",
            "password": "123123",
        }
        response = self.client.post(self.urlreg, user_data)
        self.assertEqual(201, response.status_code)



    def test_unique_email_validation(self):
        """
        Test to verify that a post call with already exists email
        """
        user_data_1 = {
            "name": "testuser",
            "email": "test@testuser.com",
            "password": "123123456",

        }
        response = self.client.post(self.urlreg, user_data_1)
        self.assertEqual(201, response.status_code)

        user_data_2 = {
            "email": "test@testuser.com",
            "password": "randompassword",
            "name":"testuser2"
            }
        response = self.client.post(self.urlreg, user_data_2)
        self.assertEqual(400, response.status_code)

class UserLoginAPIViewTestCase(APITestCase):
    url = '/api/token/'

    def setUp(self):

        user= User(name="Name", email="test@test.com")
        user.set_password("passwordok")
        user.save()

    def test_authentication_without_password(self):
        """
        Test to verify that a post call with missing fields ( password)
        """
        response = self.client.post(self.url, {"email": "john@snow.com"})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_wrong_password(self): 
        """
        Test to verify that a post call with false password
        """
        response = self.client.post(self.url, {"email": "test@test.com" , "password": "idontcare"})
        self.assertEqual(401, response.status_code)
    def test_authentication_with_valid_password(self):
        """
        Test to verify that a post call with valid account.
        """
        response = self.client.post(self.url, {"email": "test@test.com" , "password": "passwordok"})
        self.assertEqual(200, response.status_code)
    
class ChangePassword(APITestCase):
    url = '/api/user/changepassword/'

    def setUp(self):
        self.user= User(name="Name", email="test@test.com")
        self.user.set_password("passwordok")
        self.user.save()

    def test_change_password_noauth(self):
        """
        Test to check if change password possible without login
        """
        changepassworddata={
            "old_password":"passwordok",
            "password":"Random@123",
            "password2":"Random@123"

        }
        response = self.client.put(self.url, changepassworddata)
        self.assertEqual(401, response.status_code)

    def test_change_password_withauth(self):
        """
        Test to verify that a password change is successful with valid login details.
        """
        self.client.force_authenticate(user=self.user)

        changepassworddata={
            "old_password":"passwordok",
            "password":"Random@123",
            "password2":"Random@123"

        }
        response = self.client.put(self.url, changepassworddata)
        self.assertEqual(200, response.status_code)

        