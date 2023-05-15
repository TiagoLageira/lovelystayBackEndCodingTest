# GitHub User Info Command-Line App:
This is a command-line application developed using NodeJS + TypeScript + PostgreSQL. The goal of this app is to fetch information about a given GitHub user, using the GitHub API, and store it in one database table; fetch and display all users already on the database; list users only from a given location and query the programming languages this user seems to know/have repositories with.

## Requirements:
Typescript;
NodeJS;
Docker;
GitHub API Access Token;

## Installation:
1. Download and install Docker from https://www.docker.com/products/docker-desktop/;
2. Clone the repository to your local machine;
3. Initiate Docker;
4. Initiate command-line in project folder;
5. Run 'docker compose up -d' in the terminal to start the postgresql container;
6. To use the app, 'npm run start' in the terminal;
7. After using the app run 'dockercompose down' in the terminal to stop the postgresql container;

At the beggining, the app will ask for a GitHub API Access Token;

Then it will display a menu with the following options:
1. Store information about a GitHub user on a database;
2. Display all users on the database;
3. Display all users by location;
4. Display all users by programming language;
0. Exit.

Choose an option by entering the corresponding number and pressing Enter. If you choose option 1, you will be prompted to enter the name of the GitHub user you want to fetch information about. The app will then fetch the user's information from the GitHub API and store it in the database. If you choose option 2, the app will display all the users currently stored in the database. If you choose option 3, you will be prompted to enter a location and the app will display all the users in the database that have that location. If you choose option 4, you will be prompted to enter a programming language and the app will display all the users in the database that have repositories with that language. If you choose option 0, the app will exit.

## Credits
This app was developed by Tiago Lageira.
