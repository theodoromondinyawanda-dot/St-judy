import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// --- UI Logic: Slide Menu ---
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    menuToggle.textContent = sideMenu.classList.contains('active') ? '✕' : '☰';
});

// --- Firebase Data Logic ---

// 1. Fetch Hero Section Data (GitHub Link used here)
const fetchHero = () => {
    const heroRef = doc(db, "settings", "heroContent");
    onSnapshot(heroRef, (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            document.getElementById('heroTitle').textContent = data.title;
            // Using your GitHub Image link if provided in Firestore, else fallback
            const imageUrl = data.imageUrl || 'YOUR_GITHUB_RAW_IMAGE_LINK_HERE';
            document.getElementById('heroSection').style.backgroundImage = `url('${imageUrl}')`;
        }
    });
};

// 2. Fetch Interactive Cards from Firebase Database
const fetchCards = () => {
    const cardContainer = document.getElementById('cardContainer');
    const cardsCol = collection(db, "infoCards");

    onSnapshot(cardsCol, (snapshot) => {
        cardContainer.innerHTML = ''; // Clear existing
        snapshot.forEach((doc) => {
            const cardData = doc.data();
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.innerHTML = `
                <h3>${cardData.title}</h3>
                <p>${cardData.description}</p>
            `;
            cardContainer.appendChild(cardEl);
        });
    });
};

// Run initializers
fetchHero();
fetchCards();
