import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB63TLZ4UkZOlzN4XxrK8PslLYXpaZ8js4",
    authDomain: "first-firebase-project-56406.firebaseapp.com",
    projectId: "first-firebase-project-56406",
    storageBucket: "first-firebase-project-56406.appspot.com",
    messagingSenderId: "46485095241",
    appId: "1:46485095241:web:a1538d148e4bb6d5e91098"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const currentUserPromise = () => new Promise((resolve, reject ) => {
    onAuthStateChanged(auth, user => { 
        resolve(user)
    }, e => reject(e))
})

export { auth, currentUserPromise };