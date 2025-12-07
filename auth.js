// auth.js - FIXED VERSION

// Import Firebase modules directly
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Import the initialized auth from firebase-init
import { auth } from './firebase-init.js';

// Form submission handlers
export function setupAuthListeners() {
    console.log("Setting up auth listeners...");
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        console.log("Signup form found, adding listener");
        signupForm.addEventListener('submit', handleSignup);
    } else {
        console.log("Signup form NOT found");
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log("Login form found, adding listener");
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.log("Login form NOT found");
    }
    
    // Logout functionality
    setupLogoutListener();
}

// Handle signup
async function handleSignup(e) {
    e.preventDefault();
    console.log("Signup form submitted");
    
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirm').value;
    
    // Validation
    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    
    if (password.length < 6) {
        alert("Password should be at least 6 characters!");
        return;
    }
    
    try {
        console.log("Creating user with email:", email);
        // Create user with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("User created successfully:", user.email);
        alert("Account created successfully!");
        
        // Close modal and reset form
        if (typeof closeSignup === 'function') {
            closeSignup();
        }
        document.getElementById('signupForm').reset();
        
    } catch (error) {
        console.error("Signup error:", error);
        alert("Error: " + error.message);
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    console.log("Login form submitted");
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        console.log("Logging in with email:", email);
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("User logged in:", user.email);
        alert("Logged in successfully!");
        
        // Close modal and reset form
        if (typeof closeLogin === 'function') {
            closeLogin();
        }
        document.getElementById('loginForm').reset();
        
        updateLoginUI(user);
        
    } catch (error) {
        console.error("Login error:", error);
        alert("Error: " + error.message);
    }
}

// Update UI based on auth state
function updateLoginUI(user) {
    const loginBtn = document.querySelector('.login-btn');
    const userLink = document.getElementById('userLink');
    const userIcon = document.getElementById('userIcon');
    if (loginBtn) {
        if (user) {
            loginBtn.textContent = "Log Out";
            loginBtn.onclick = handleLogout;
            // Show user icon/link
            if (userLink) userLink.style.display = 'inline-flex';
            if (userIcon) {
                const name = user.displayName || user.email || '';
                userIcon.textContent = (name && name[0]) ? name[0].toUpperCase() : 'U';
            }
        } else {
            loginBtn.textContent = "Log In";
            loginBtn.onclick = function() { 
                if (typeof openLogin === 'function') openLogin(); 
            };
            // Hide user icon/link when not logged in
            if (userLink) userLink.style.display = 'none';
        }
    }
}

// Setup logout listener
function setupLogoutListener() {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            if (auth.currentUser) {
                e.preventDefault();
                handleLogout();
            }
        });
    }
}

// Handle logout
async function handleLogout() {
    try {
        await signOut(auth);
        alert("Logged out successfully!");
        updateLoginUI(null);
    } catch (error) {
        console.error("Logout error:", error);
        alert("Error logging out: " + error.message);
    }
}

// Check auth state on page load
export function initAuth() {
    console.log("Initializing auth...");
    
    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
        console.log("Auth state changed, user:", user?.email);
        if (user) {
            console.log("User is already logged in:", user.email);
            updateLoginUI(user);
        } else {
            console.log("No user logged in");
            updateLoginUI(null);
        }
    });
    
    // Set up form listeners
    setupAuthListeners();
}