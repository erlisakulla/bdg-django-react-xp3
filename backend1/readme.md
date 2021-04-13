# BACKEND README

## Software Requirements
Install Python and Pip before working on the Backend.
Python 3.8.8 64-bit, pip 20.2.3 was used while creating this Backend Project.


## Installation
Follow the steps mentioned below after Python and Pip Installation.
### NOTE
If you are reading this documentation. It is assumed that you are already inside the backend directory of the project and has already cloned the repository. If not goto home directory of this repo and read the readme documentation.

Inside backend directory ,run 
```bash
pip install virtualenv
```
for installing virtualenv package which will be used for isolating the packages used for this project. 
We recommend that you should create a virtual environment before working on this backend project.

```bash
virtualenv venv
```
'venv' can be replaced according to your preferance.


You can activate the python environment by running the following command:
Mac OS / Linux
```bash
source venv/bin/activate
```
Windows
```shell
venv\Scripts\activate
```
You should activate the venv again if you comeback later or open new tab on the terminal.

After activating the virtualenvironment, please run the following commands.

```bash
pip install -r requirements.txt
```
'requirements.txt' contains all the pip packages required for this project to work properly. This file contains
```
django
djangorestframework
django-cors-headers
djangorestframework_simplejwt
drf-yasg
```

Once sucessful, run  the migration commands to create migrations files and migrate the Models to the database.
```
python manage.py makemigrations
python manage.py migrate
```
You must run the above commands everytime you do any changes in the models like adding a property, and needs to be updated in the database.

### Starting the Server
```
python manage.py runserver
```
### To create a newapp 
```
python manage.py startapp
```

### Running Tests
```
python manage.py test
```


## PROJECT FILE STRUCTURE
```
    beergame
    ├── api
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── migrations
    │   │   ├── 0001_initial.py
    │   │   ├── 0002_alter_game_isdefaultgame.py
    │   │   └── __init__.py
    │   ├── models.py
    │   ├── serializers.py
    │   ├── tests
    │   │   ├── __init__.py
    │   │   ├── tests_api_game.py
    │   │   ├── tests_api_roles.py
    │   │   ├── tests_api_user.py
    │   │   └── tests_model.py
    │   └── views
    │       ├── __init__.py
    │       ├── game.py
    │       ├── role.py
    │       └── user.py
    ├── beergameapi
    │   ├── __init__.py
    │   ├── asgi.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── db.sqlite3
    ├── manage.py
    ├── readme.md
    └── requirements.txt

```


## References
1. [Django Documentation](https://docs.djangoproject.com/en/3.2/)
2. [djangorestframework Quicstart](https://www.django-rest-framework.org/tutorial/quickstart/)
3. [django-cors-headers
](https://pypi.org/project/django-cors-headers/) - Cross-origin resource sharing
4. [djangorestframework_simplejwt](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) - WebTokens
5. [drf-yasg](https://drf-yasg.readthedocs.io/en/stable/readme.html) - Yet another Swagger generator - API Playground/
