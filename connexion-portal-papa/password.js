/* Permet de changer le type=password en type=text en cliquant 
sur la checkbox et inversement dans le but d'afficher le mot de passe. */

document.addEventListener('DOMContentLoaded', function () {
    const showPasswordCheckbox = document.getElementById('show-password');
    const passwordInput = document.querySelector('.input input[type="password"]');
  
    showPasswordCheckbox.addEventListener('change', function () {
      if (this.checked) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    });
  });
