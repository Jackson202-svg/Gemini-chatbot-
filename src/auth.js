// src/auth.js example
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('google-login').onclick = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    });
};
