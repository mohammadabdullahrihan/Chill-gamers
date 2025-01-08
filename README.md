# Chill Gamer 🎮

Welcome to Chill Gamer, the ultimate platform for gaming enthusiasts! Whether you're a casual gamer or a hardcore enthusiast, Chill Gamer lets you explore insightful game reviews, share your opinions, and build your personalized gaming watchlist. Dive into a community that shares your passion for gaming.

## 🌐 Live Site
[Chill Gamer Live Demo](https://chill-gamer-rihan.netlify.app/)

## Overview
Chill Gamer is a feature-rich gaming platform designed to offer gamers an engaging space to explore, review, and track their favorite games. With advanced filtering options and personalized features, the platform ensures a seamless and enjoyable experience for every user.

---

## Features 🚀

### **Game Reviews**
- Discover honest and insightful reviews of both popular and indie games.
- Contribute your own reviews to help guide the gaming community.

### **User Authentication**
- Secure sign-up and login functionality using Firebase.
- Personalized profiles for managing reviews and watchlists.

### **Dynamic Theme Switching**
- Toggle between dark and light themes for an optimized browsing experience.
- Your theme preferences are saved for future visits.

### **Advanced Filtering & Sorting**
- Sort reviews by popularity, ratings, or date.
- Filter games based on genres and platforms.

### **Wishlist and Watchlist**
- Keep track of your favorite games and upcoming releases.
- Create personalized lists for easy access anytime.

---

## Tech Stack 🛠️

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Firebase
- **Deployment**:
  - **Frontend**: Netlify
  - **Backend**: Vercel

---

## Dependencies

1. **Frontend**:
   - React
   - Tailwind CSS
   - React Router
   - Axios

2. **Backend**:
   - Express.js
   - Mongoose
   - Cors
   - dotenv

3. **Authentication**:
   - Firebase

---

## Getting Started
Follow these steps to set up Chill Gamer on your local machine:

### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud).
- Firebase account for authentication setup.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/mohammadabdullahrihan/Chill-gamers-client.git]
   cd chill-gamers-client
   git clone [https://github.com/mohammadabdullahrihan/Chill-gamers-server.git]
   cd chill-gamers-server
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend folder with the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     FIREBASE_API_KEY=your_firebase_api_key
     ```

4. Run the development servers:
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```

5. Open the app in your browser:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Relevant Links

- **Live Site**: [Chill Gamer](https://chill-gamer-rihan.netlify.app/)
- **Frontend Repository**: [GitHub Repo - Frontend](https://github.com/mohammadabdullahrihan/Chill-gamers-client)
- **Backend Repository**: [GitHub Repo - Backend](https://github.com/mohammadabdullahrihan/Chill-gamers-server)

---

Contributions are welcome! Feel free to fork the repo and create pull requests to enhance Chill Gamer further.

