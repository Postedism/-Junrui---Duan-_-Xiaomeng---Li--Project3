# Online Sudoku (Project 3)

**Developer:** [Junrui Duan & Xiaomeng Li]
**Render Link:** [(https://webdevfinalproject-3zw6.onrender.com/)]
**Youtube URL**[(https://youtu.be/a_nLnmTXFzc)]
---

## ✨ Key Features & Bonus Points

### 🎯 Core Features
* **User Authentication:** Secure Login and Register functionality with password validation.
* **Game Modes:** Support for **Easy (6x6)** and **Normal (9x9)** grids.
* **Interactive Gameplay:**
    * Real-time conflict checking (Visual feedback for incorrect numbers).
    * Hint feature to help players.
    * "Reset Board" feature to restart the game.
    * Win detection and automatic score recording.
* **High Scores:** A leaderboard displaying the most popular games played by users.

### 🌟 Bonus Features (Please Test!)
I have implemented the **Delete Game** functionality.

---

## 📝 Project Writeup

### 1. Challenges Faced
* **Deployment Configuration:** Connecting the frontend and backend on Render was tricky. I had to ensure the build commands (`npm install && npm run build`) were correct and that the MongoDB whitelist allowed connections from the cloud server.
* **State Management:** Handling the Sudoku board state (checking for conflicts, updating cells, handling immutability) in React Context required careful logic to avoid bugs and I used same logic like Project2.
* **Database Schema:** Designing the schema to link Users and Games (tracking who completed which game) took some planning to ensure the High Score page rendered correctly.


### 2. Assumptions Made
* I assumed that once a game is deleted by the creator, it should be completely removed from the database, even if other users have played it.

### 4. Time Spent
Approximately **[20]** hours.

---

## 🛠️ Technology Stack
* **Frontend:** React, Vite, CSS (Responsive Design)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas), Mongoose
* **Deployment:** Render.com

---
