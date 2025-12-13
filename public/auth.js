/**
 * Handles Firebase Authentication logic including Signup, Login, 
 * Logout, and UI state management.
 */

// Import Firebase modules directly
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Import the initialized auth from firebase-init
import { auth } from './firebase-init.js';

/**
 * Sets up DOM event listeners for authentication forms (Signup and Login).
 * Checks for the existence of forms before attaching listeners to prevent errors.
 */
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

/**
 * Handles the submission of the signup form.
 * Validates password matching and length before creating a user in Firebase.
 * * @async
 * @param {Event} e - The form submission event.
 */
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

/**
 * Handles the submission of the login form.
 * Authenticates the user with Firebase using email and password.
 * * @async
 * @param {Event} e - The form submission event.
 */
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

/**
 * Updates the UI elements based on the user's authentication state.
 * Toggles between "Log In" and "Log Out" buttons and displays user avatar/initials.
 * * @param {Object|null} user - The Firebase User object if logged in, or null if logged out.
 */
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

/**
 * Attaches a click listener to the login/logout button to handle logout actions.
 * Ensures the event only triggers if a user is currently authenticated.
 */
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

/**
 * Signs the user out of Firebase and resets the UI.
 * * @async
 */
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

/**
 * Initializes the authentication module.
 * - Sets up the Firebase Auth state observer.
 * - Calls the function to set up form listeners.
 * * This is the main entry point for this module.
 */
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