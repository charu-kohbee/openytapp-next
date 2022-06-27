import { initializeApp } from '@firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

export function onload() {
    var app;
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyCZe6WWGTpvACy6AMT7C6XxGPJgKF7iAPA",
            authDomain: "openin-e5b21.firebaseapp.com",
            databaseURL: "https://openin-7ab70.asia-southeast1.firebasedatabase.app",
            projectId: "openinyoutube",
            storageBucket: "openinyoutube.appspot.com",
            messagingSenderId: "1083227947556",
            appId: "1:1083227947556:web:5b1853a71a242ac07b4eb1",
            measurementId: "G-Q506WL2EW0"
        };
        var app = initializeApp(firebaseConfig);
    }
    catch (err) {
        if (!/already exists/.test(err.message)) {
            console.log('Firebase initialization error', err.stack);
        }
    }
    const firestore = getFirestore();

    return {
        firestore: firestore,
    }
}

