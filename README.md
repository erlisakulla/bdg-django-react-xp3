# se-01-team-32
SE Sprint 01, Team 32
# Note
Our group has proposed some changes to the specification. It can be found in bonus.txt in the root folder. We put a lot of effort in proposing these changes, because we think it is something all other groups will benefit from.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Contributions](#constribution)

## General info
For this sprint we have contributed on both the frontend and backend part of the software, focusing more on the latter (each part can be found on the respective folder). Regarding the backend, we have constructed the database, created all the models as defined in bonus.txt file and implemented the controllers and the API only for the user model, properly implementing the authorization and authentication(token-based authentication) of the user in case of login/signup or when accessing the main page of the website. Regarding the frontend, the login and signup pages are created, together with the landing page of the website once the student/instructor is successfully logged in. Overall, the login and signup part of the project is completed: the frontend and the backend are connected with each other; the most important backend functionality is implemented, making the other phases easier.
	
## Technologies
### Backend
In the backend, **Node Js** is used, together with its web framework **Express JS**. The list of dependencies with their respective version can be found in the package.json inside the backend folder. The database system is **MySql**, and **Sequelize** is used in order to make the interaction with the database easier. Sequelize is a promise-based Node Js ORM (Object-Relational Mapper), which features transaction support, relations, eager and lazy loading, read replication and more. **Cors** is also installed as a node module, in order to provide a Connect/Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing) with various options, making the communication between frontend and backend easier. **Joi** is used for data validation: in our case, validating the data that is send from the client side through the form in the login, signup page. **Bcrypt** is used for encrypting/decrypting the password. **JWT** (Json WEB Token) is used for authentication of the user that is logged in/signed up.
### Frontend
* **React JS** is used together with **CSS**
* **Axios** is used to make HTTP request to the server.
## Setup
* **Server side**\
MySql must be locally installed. You have to manually create a database named "game". Put the credentials in the config.json found in backend/config directory. Then in order to create the entities with the corresponding data:
```
$ cd backend
$ npm install
$ npx sequelize-cli db:migrate
```
Create a .env file as shown in the .env.example (inside the backend folder) where you will store the token used for authentication.
After the database is created, just start the server:
```
$ npm start
```
* **Client Side**
```
$ cd ../frontend
$ npm install
$ npm start
```
* After both of them are running just navigate to http://localhost:3000/login
## Contributions
Sprint Number 1: Date 09/03/2021

