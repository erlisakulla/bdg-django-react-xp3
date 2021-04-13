# se-02-team-32

SE Sprint 03, Team 32, Date: 13.04.2021

# Table of Contents
- [Overview of Changes From Last Sprint](#overview-of-changes-from-last-sprint)
- [Project Overview](#project-overview)
- [Bonus](#bonus)
  * [Further Implementation](#further-implementation)

# Overview of Changes From Last Sprint
* Implementing Django REST framework
* Significant changes in frontend design and structure
* Connecting frontend and backend using `axios`
  - Requests are handled using JWT token authentication
* Implemented many functionalities, for more details check the backend and frontend README.md files

# Project Overview
* **Backend**: Django
* **Frontend**: React

This project is divided into two main apps: [backend](backend) and [frontend](frontend). They must be run separately but at the same time. First clone the repository using:
```
git clone https://github.com/lorenzorota/se-03-team-32.git
```

For full documentation on how to setup the project follow the links below:
* Backend: [README.md](backend/readme.md)
* Frontend: [README.md](frontend/README.md)

# Bonus
In our implementation, we have changed some parts from the specification document. We thought it would be easier and better that the student registers for the created games rather than the instructor assigning them and dealing with passwords or emails. For now, students can register to any created game (that has available roles, games with assigned roles don't appear), despite of the instructor that created them, however this could be later on limited to a list of games created by the student's instructor. Also a student can't register for the same game in more than one role and only one student can be registered per role. The student could either select the instructor from a select option that has a list of all registered instructors, or provide a unique instructor id/code that identifies their instructor to protect their data privacy.

The suggestions below could be a guide of following up the changes we have made, however not limited to other suitable options.

## Further Implementation
Despite most APIs, pages and components being implemented, there is still room for improvement. Some other functionalities that can be added are:
* Students can select Instructor upon registration. Then students can only join games that their instructor creates.
* Including Demand in game implementation and logic.
* Finishing up Game Insights page that displays the selected plots and other game data.
* Adding Delete Account option.
* Student gets notified when a game is activated from the instructor (maybe by email). Instructor can schedule a game to be activated at a specific time.
* Implementing what happends when game is completed