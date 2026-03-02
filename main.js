// --- 1. FIREBASE CONFIGURATION ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWLCL0nVLaTUUAXngiym6F0pkHZEo945E",
  authDomain: "st-judy.firebaseapp.com",
  projectId: "st-judy",
  storageBucket: "st-judy.firebasestorage.app",
  messagingSenderId: "25044607118",
  appId: "1:25044607118:web:2c08c06a7c8ef6571429df",
  measurementId: "G-BBH1ZZMXKQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- 2. LIVE DATABASE LISTENER (For Admin Updates) ---
// This ensures that when you update your Firebase Database (Firestore) 
// from your admin side, the text on Page 3 updates instantly on GitHub.
onSnapshot(doc(db, "school_data", "notice_board"), (doc) => {
    if (doc.exists()) {
        const data = doc.data();
        const noticeParagraph = document.querySelector("#page3 p");
        if (noticeParagraph) {
            noticeParagraph.innerText = data.text; 
            // Ensure your Firebase field is named 'text'
        }
    }
});

// --- 3. MENU TOGGLE LOGIC ---
const menuBtn = document.getElementById('menuBtn');
const navOverlay = document.getElementById('navOverlay');

menuBtn.addEventListener('click', () => {
    navOverlay.classList.toggle('open');
    // Wit: If the menu is open, the book stays still!
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navOverlay.classList.remove('open');
    });
});

// --- 4. SCROLL ANIMATION LOGIC (Intersection Observer) ---
// This triggers the 'active' class which slides the glass shelf up.
const observerOptions = {
    threshold: 0.6 // Trigger when 60% of the page is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Optional: remove if you want text to slide out when scrolling away
            // entry.target.classList.remove('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.page').forEach(page => {
    observer.observe(page);
});
