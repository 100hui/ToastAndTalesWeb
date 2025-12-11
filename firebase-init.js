import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
// 1. ADD THIS IMPORT
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

// 2. INITIALIZE REALTIME DATABASE SEPARATELY
const realtimeDb = getDatabase(app); 

console.log("Firebase connected with Auth, Firestore, and Realtime Database.");

// 3. EXPORT 'realtimeDb'
export { app, auth, db, realtimeDb };