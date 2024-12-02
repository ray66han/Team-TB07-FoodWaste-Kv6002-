# Team-TB07-FoodWaste-Kv6002-

Welcome to the **FoodWaste System**! This project was developed by **Team TB07** as part of **Module KV6002**.


## 🔧 Prerequisites

Ensure the following are installed on your system:

- **Node.js(+npm included)**  
  Install using Chocolatey (Windows):  
  ```bash
  choco install nodejs-lts --version="20.18.0"
- **Git (For cloning the repository)**

## 📂 Project Structure

The project is organized into two main parts:

- **Backend**: Node.js/Express server  
  📁 Located in the `backend/` folder.

- **Frontend**: React application  
  📁 Located in the `react-app/` folder.

## 🚀 Installation and Setup

Follow the steps below to set up and run the project locally:

1️⃣ Clone the Repository  
`git clone https://github.com/your-username/Team-TB07-FoodWaste-Kv6002.git`  
📝 *Note: Replace `your-username` with your actual GitHub username.*

2️⃣ Set Up the Backend  
Navigate to the `backend/` folder:  
`cd Team-TB07-FoodWaste-Kv6002`  
`cd backend`  

Install dependencies:  
`npm install`  

Create a `.env` file in the `backend/` folder and configure the following variables:  
`MONGODB_URI=mongodb+srv://shihanaqib:q4P2YcOCq1qQ14HA@tb07.42zr7.mongodb.net/`  
`PORT=5000`  

📝 *Note: Update the `PORT` if required. If changed, modify `react-app/src/components/config.json` accordingly:*  
`{ "API_URL": "http://localhost:5000" }`  

Start the backend server:  
`node index.js`

3️⃣ Set Up the Frontend  
Navigate to the `react-app/` folder:  
`cd ../react-app`  

Install dependencies:  
`npm install`  

Start the React development server:  
`npm run dev`  

Open your browser and navigate to the URL displayed in the terminal (typically `http://localhost:5173`).

Alternatively, once installed and run once, you can start both the backend and frontend simultaneously:  
`cd ..`  
`npm run start`  

🎉 **Your FoodWaste System is now up and running!**

