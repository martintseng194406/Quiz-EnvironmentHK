import { auth } from './app.js';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert('Registration successful! You will be redirected.');
          window.location.href = 'index.html'; 
        })
        .catch((error) => {
          alert('Error: ' + error.message);
        });
    });
  }
});