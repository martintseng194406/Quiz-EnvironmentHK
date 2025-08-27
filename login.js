import { auth } from './app.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const emailError = document.getElementById('email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

  // Validate email format
  if (!emailRegex.test(email)) {
    emailError.style.display = 'block'; // Show error message
    return;
  } else {
    emailError.style.display = 'none'; // Hide error message
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Login successful!');
      // Redirect or update UI as needed
      window.location.href = 'home.html'; // Redirect to home page
    })
    .catch((error) => {
      alert('Login failed: ' + error.message);
    });
});