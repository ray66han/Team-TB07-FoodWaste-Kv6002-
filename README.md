# Team-TB07-FoodWaste-Kv6002-

This project was developed by **Team TB07** as part of **Module KV6002**. We focused on the **"How can we support the management of food waste?"** and aimed to build an implementation-oriented system.

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
  - 📁 Located in the `backend/` folder.
  - 🔄 All necessary files are located in the root.

- **Frontend**: React application  
  - 📁 Located in the `react-app/` folder.
  - 🔄 All necessary files are located in `react-app/src/`.
    - 🖼️ **Images**: Found in the `assets` folder.
    - 🧩 **Components**: All `.jsx` and `.css` files are in the `components` folder.

## 🔑 Login Details

To log in, use the following credentials:

```javascript
Username = "expiryalertUser01"
HardcodedPassword = "123456Gh@!";
```
## 🚀 Installation and Setup

Follow the steps below to set up and run the project locally:

1️⃣ Clone the Repository  
```bash
git clone https://github.com/ray66han/Team-TB07-FoodWaste-Kv6002-.git
```

2️⃣ Set Up the Backend  
Navigate to the `backend/` folder: 
```bash
cd Team-TB07-FoodWaste-Kv6002-/backend
``` 

Install dependencies:  
```bash
npm install
```  

Start the backend server: 
```bash
node index.js
```

📝 *Note: If the current PORT is being used by something else update the `PORT`  in the backend/.env file  to something else (e.g. PORT=5001) if you do change the PORT make sure you modify `react-app/src/components/config.json` accordingly to your new port Ex:- :*
```bash
{ "API_URL": "http://localhost:5001" }
```  

The backend should now be running on you PORT and you should be connected to the database, To confirm you should see the following log in your terminal:
```bash
Server is running on port 5000
Connected to MongoDB
```
Keep your backend server running and open a new terminal for the front end. 

3️⃣ Set Up the Frontend  
Navigate to the `react-app/` folder: 
```bash
cd Team-TB07-FoodWaste-Kv6002-/react-app
``` 

Install dependencies:
```bash  
npm install
```  

Start the React development server:
```bash
npm run dev
```  

Open your browser and navigate to the URL displayed in the terminal (typically `http://localhost:5173`).

**Make sure both the backend server and front end are running at the same time**

🎉 **ExpiryAlert should now be running!**

Alternatively, once all the dependencies are installed and run once, you can start both the backend and frontend simultaneously by navigating to the main directory 'Team-TB07-FoodWaste-Kv6002-':
```bash
cd ..
```

```bash
npm run start
```  

