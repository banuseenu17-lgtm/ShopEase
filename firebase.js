import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBz5dhJa50WchkuX0b4h09AdvZwMP3tNmQ",
    authDomain: "shopease-7db52.firebaseapp.com",
    projectId: "shopease-7db52",
    storageBucket: "shopease-7db52.firebasestorage.app",
    messagingSenderId: "338516168423",
    appId: "1:338516168423:web:358886774165e69a4bdc42"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
