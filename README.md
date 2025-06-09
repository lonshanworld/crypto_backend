# Project Setup Instructions

## Prerequisites
- Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

- Please change the environment values in .env file to align with your local setup

---

## Steps to Run the Project

1. **Install dependencies**

   Run the following command to install all required packages:

   ```bash
   npm install

2. **Replace the vales in .env file**

   check all the key and use the values from your project setup


3. **Run the database seeder**

   Before starting the project, you need to seed the database with initial data:

   ```bash
   npm run seed


4. **Start the project**

   Finally, run the project with:

   ```bash
   npm run start


## Swagger set up
#### I have included Swagger in this project to provide an easy way for you to explore and test all available APIs.####

You can access the Swagger UI at the following URL once the project is running:

**  Application is running on: http://localhost:3030/api  **

**  Swagger UI available at: http://localhost:3030/swagger  **

(Replace PORT with the actual port number your server uses.)

Swagger will show all the API endpoints with details such as request parameters, responses, and error codes.
