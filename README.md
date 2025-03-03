# todo-app

## Getting Started

### Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/nikkiarae/todo-app.git
   cd todo-app
   ```

### Frontend 

1. Switch to "frontend" Directory

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install

   ```

3. Create a .env.local file
   Create a .env.local file in the root directory and add the following variables:

   ```env
   # Host address (exp: http://localhost:3001)
   FRONTEND_URL=http://localhost:3001

   # Springboot Connection 
   BACKEND_URL=http://localhost:8080

   ```

### Backend 

### Running Application

1. Return back to the "root" directory

   ```bash
   cd ..
   ```

2. Running Project
   The included docker-compose.yml file sets up Java Springboot and NextJS Client Application. Use the following command to start the project:

   ```bash
   docker-compose up --build -d

   ```

This will:
   • Start the NextJS client application.
   • Spin up a Java SpringBoot instance.
   • Spin up a MySQL with Liquibase.

### View Application & Database

1. View Todo App at http://localhost:3001

2. View Data at http://localhost:8081 

   Credentials are:
      Server: leave blank
      User: user
      Password: password
   
   The database is called "todo_db"

3. View REST endpoints at http://localhost:8080/swagger-ui/index.html
