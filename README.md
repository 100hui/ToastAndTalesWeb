# Toast & Tales Web Portal

The Official Companion Website for the Toast & Tales AR Game. <br>
Developers: Rui Min & Baihui

## 1. Project Overview

This website serves as the central hub for the Toast & Tales project. It acts as both a promotional landing page to introduce the Ya Kun heritage story and a Player Dashboard.<br>
Crucially, the website connects to the same Google Firebase backend as the mobile game. This allows players to log in with their game credentials and view their AR gameplay achievements (Badges) in real-time.

- **Tech Stack**: HTML5, CSS3, JavaScript
- **Backend**: Google Firebase (Authentication & Realtime Database)

## 2. Website features

### A. Homepage (index.html)

- Hero Carousel: Visual "Relive the Heritage" banner showcasing the Kopi and Toast culture.

- About Section: Introduction to the AR game mechanics and objectives.

- Heritage Story: An educational section detailing the history of Ya Kun and Ah Koon since 1944.

- Authentication: Pop-up Modals for Login and Sign Up.
  - Note: Accounts created here work in the mobile app, and vice versa.

### B. User Profile (user.html)

- Real-time Sync: Upon logging in, the site fetches the user's specific data (UID) from the Firebase Realtime Database.

- Badge System: Displays earned achievements based on game progress:

  - ☕ Nanyang Brewmaster: Unlocked when Kopi level is complete.

  - 🍞 Charcoal Grill Guardian: Unlocked when Toast level is complete.

  - 🏆 The Heritage Legend: Unlocked when the Full Set Meal is assembled.

- Locked States: Badges not yet earned appear greyed out to encourage gameplay.

### C. Contact Us (contactus.html)

- Team Credits: Profiles for the development team (Baihui & Rui Min).

- Studio Info: Location details for Ngee Ann Polytechnic IM01.

- Visual Design: Clean layout featuring studio imagery.

## 3. File Structures

- HTML Pages:

  - index.html - Main landing page.

  - user.html - Protected profile page (requires login).

  - contactus.html - Team info and contact details.

- Styles:
  - homepage.css - Global styling variables (Heritage Brown/Red colors), navigation, and layout logic.
- Scripts:

  - firebase-config.js - Contains API keys and project configuration.

  - firebase-init.js - Initializes the App, Auth, and Realtime Database services.

  - auth.js - Manages login/signup modal logic.

## 4. How to Run Locally

Since the project uses JavaScript Modules (type="module"), it cannot be run by simply opening the HTML files directly from a folder. It requires a local server. <br>

### How to Run Locally

1. Open the project folder in Visual Studio Code.

2. Install the "Live Server" extension.

3. Right-click index.html and select "Open with Live Server".

4. The site will launch at http://127.0.0.1:5500/.

## 5. Credits & Assets

- Images: Sourced from and official Ya Kun promotional materials (Educational use).

- Icons: Badge icons used in the Profile section are standard Unicode Emojis (☕, 🍞, 🏆).
