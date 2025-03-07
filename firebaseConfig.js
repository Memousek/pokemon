// src/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCuwUU0UHUqltuTawZs1j7QmZHKqdY_n9E",
    authDomain: "pokemon-8442a.firebaseapp.com",
    projectId: "pokemon-8442a",
    storageBucket: "pokemon-8442a.firebasestorage.app",
    messagingSenderId: "334581327735",
    appId: "1:334581327735:web:2e5a92897bf33551216372",
    measurementId: "G-WZ1DH4R2DM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
