# Online Sudoku (Project 3)

**Developers:** Junrui Duan & Xiaomeng Li  
**Deployed App:** [Render Link](https://webdevfinalproject-3zw6.onrender.com/)  
**Video Demo:** [YouTube Walkthrough](https://youtu.be/a_nLnmTXFzc)

---

## Key Features

### Core Features
* **User Authentication:** Secure Login and Register functionality with input validation.
* **Multiple Game Modes:** Support for **Easy (6x6)** and **Normal (9x9)** grid layouts.
* **Interactive Gameplay:**
    * **Real-time Validation:** Visual feedback (red highlights) for conflicting numbers.
    * **Smart Hints:** Helper feature to identify naked singles for players.
    * **Reset Capability:** "Reset Board" button to restart the current game instantly.
    * **Win Detection:** Automatic victory recognition and score recording.
* **High Scores:** A dynamic leaderboard displaying the most popular games based on completion count.

### Bonus Features
**Delete Game Functionality** We have implemented the ability for game creators to delete their puzzles.


---

## Project Writeup

### 1. Challenges Faced
* **Deployment Configuration:** Connecting the frontend (Vite) and backend (Express) on Render proved challenging. We had to ensure the build commands (`npm install && npm run build`) were configured correctly and that the MongoDB Atlas whitelist allowed connections from the cloud server IP.
* **State Management:** Handling the Sudoku board state—specifically checking for conflicts, updating cells, and maintaining immutability in React Context—required careful logic to prevent bugs. We successfully adapted and optimized the logic used in Project 2 for this full-stack implementation.
* **Database Schema:** Designing the Mongoose schema to link Users and Games (e.g., tracking specifically *who* completed *which* game) required strategic planning to ensure the High Score page rendered data accurately.

### 2. Assumptions Made
* We assumed that when a creator deletes a game, it should be permanently removed from the database for all users, and the "win" counts associated with that specific game should be deducted from players' records.

### 3. Time Spent
Approximately **20 hours**.

---

## 🛠️ Technology Stack
* **Frontend:** React, Vite, CSS (Responsive Design)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas), Mongoose
* **Deployment:** Render.com