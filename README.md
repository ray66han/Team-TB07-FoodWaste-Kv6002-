# Team-TB07-FoodWaste-Kv6002-

This repository will be used by TB07 team (KV6002) regarding to build a Food Waste system.


# Prerequisites
Ensure you have the following installed on your system:

Node.js 

#download and install Node.js

```bash
choco install nodejs-lts --version="20.18.0"
```

npm (comes with Node.js)
Git (for cloning the repository)

# Project Structure
The project is divided into two parts:

Backend: Node.js/Express server (located in the backend/ folder).
Frontend: React app (located in the react-app/ folder).

# Installation and Setup
Follow the steps below to set up and run the project locally:

1. Clone the Repository

```bash
git clone https://github.com/your-username/Team-TB07-FoodWaste-Kv6002.git
```
//replace 'your-username' with your actual username

```bash
cd Team-TB07-FoodWaste-Kv6002
```

2. Set Up the Backend
Navigate to the backend/ folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a .env file in the backend folder and configure the following variables:

```bash
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
```
Note: Replace <your-mongodb-connection-string> with your MongoDB URI.

Start the backend server:

```bash
node index.js
```

3. Set Up the Frontend
Navigate to the react-app/ folder:

```bash 
cd ../react-app
```

Install dependencies:

```bash
npm install
```
Start the React development server:

```bash 
npm run dev
```
Open your browser and navigate to the URL displayed in the terminal (typically http://localhost:3000).


Alternatively once installed and run once you can run both the front end and backend at once:

```bash
cd ..
```
```bash
npm run start
```

