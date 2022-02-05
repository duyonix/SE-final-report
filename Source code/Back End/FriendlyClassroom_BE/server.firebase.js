// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
// const { getAnalytics } = require("firebase/analytics");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZYRv8nLKwDy3bokhO3TNKPzkoRGPP3mo",
    authDomain: "friendlyclassroombe.firebaseapp.com",
    projectId: "friendlyclassroombe",
    storageBucket: "friendlyclassroombe.appspot.com",
    messagingSenderId: "911838737258",
    appId: "1:911838737258:web:5cb9daf8e17dd939452b13",
    measurementId: "G-WY1Y239E38"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
console.log(appFirebase)
    // const analytics = getAnalytics(appFirebase);

module.exports = { appFirebase }