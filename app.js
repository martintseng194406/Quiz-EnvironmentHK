import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCX03lF-FF3T9FDNlu00-6CvxOYH8w6-9o",
  authDomain: "quizland-a3bf3.firebaseapp.com",
  projectId: "quizland-a3bf3",
  storageBucket: "quizland-a3bf3.firebasestorage.app",
  messagingSenderId: "759471753664",
  appId: "1:759471753664:web:c993ce2ed643d148f06025",
  measurementId: "G-THV5ZXMX0J"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // <-- Initialize auth first

setPersistence(auth, browserSessionPersistence); // <-- Now call setPersistence

export { auth, onAuthStateChanged };

// ...existing code for onAuthStateChanged...
onAuthStateChanged(auth, (user) => {
  const userInfo = document.getElementById('user-info');
  if (user) {
    if (userInfo) {
      userInfo.textContent = `Signed in as ${user.email}`;
    }
    if (window.location.pathname.includes('register.html') || window.location.pathname.includes('login.html')) {
      window.location.href = 'index.html';
    }
  } else {
    if (userInfo) {
      userInfo.textContent = 'Not signed in';
    }
  }
});