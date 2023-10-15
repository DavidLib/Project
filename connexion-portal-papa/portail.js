/////////////////////////////////////////////////////////////////////////////////  
// Attend que le DOM soit complètement chargé avant d'exécuter le code suivant
/////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () { 

  /////////////////////////////////////////////////////////////////////////////////  
  // CHECKBOX : Si coché, l'input passe du format password à text, le mot de passe est visible.
  /////////////////////////////////////////////////////////////////////////////////
  
  showPasswordCheckbox.addEventListener('change', function () { 
    if (this.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });
});
  
  /////////////////////////////////////////////////////////////////////////////////  
  // Récupération des éléments par leurs ID/class
  /////////////////////////////////////////////////////////////////////////////////
  
  const showPasswordCheckbox = document.getElementById('show-password');
  const passwordInput = document.querySelector('.input input[type="password"]');
  const formBox = document.querySelector('.form-box');
  const connexionButton = document.getElementById('connexion-button');
  const ldsGrid = document.getElementById('lds-grid');
  const loadingText = document.getElementById('loading-text');
  
  /////////////////////////////////////////////////////////////////////////////////  
  // Écoute le clic sur le bouton Connexion
  /////////////////////////////////////////////////////////////////////////////////
  
  connexionButton.addEventListener('click', function (event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
      
  /////////////////////////////////////////////////////////////////////////////////  
  // Verifie si l'email et le mot de passe sont correct
  /////////////////////////////////////////////////////////////////////////////////
  
     const email = document.querySelector('.input input[type="email"]').value;
     const enteredPassword = passwordInput.value;
     const correctEmail = 'nom.prenom@mail.com';
     const correctPassword = 'password-safe';
  
  if (email === correctEmail && enteredPassword === correctPassword) { // Condition
        
  ///////////////////////////////////////////////////////////////////////////////// 
  // Désactive le clic sur la page une fois la connexion validée (Pour ne pas cliquer sur un objet caché)
  /////////////////////////////////////////////////////////////////////////////////
  
  formBox.classList.add('disable-click');
    document.querySelector('.mdp-oublie').classList.add('disable-click'); // Lien mot de passe oublié
    document.querySelector('.button-style').classList.add('disable-click'); // Bouton connexion
  
  ///////////////////////////////////////////////////////////////////////////////// 
  // Promesse d'attendre la fin des deux transitions de formElements (élément du formulaire)
  // avant de passer aux prochaines transitions.
  /////////////////////////////////////////////////////////////////////////////////
  
  // Transition d'opacité
  
  const transitionPromise = new Promise((resolve) => { // L'opacité des éléments du formulaire passe de 1 à 0 en 1200ms
  const formElements = formBox.querySelectorAll('*');
    formElements.forEach(function (element) {
      element.style.transition = 'opacity 1200ms ease-in-out';
      element.style.opacity = '0';
  
  // Transition de largeur/hauteur    
  
      element.addEventListener('transitionend', function () { // La hauteur et la largeur des éléments du formulaire passe a 0x0 pixels en 0ms
      element.style.transition = 'all 0ms ease-in-out'; // cela permet de ne pas géner les transitions suivantes.
      element.style.height = '0px';
      element.style.width = '0px'; });
  
  // Transition de box-shadow
  
        formBox.style.transition = 'box-shadow 400ms ease-in-out'; // L'ombre du formulaire (interne/externe) revient a sa position initiale 0 en 400ms
        formBox.style.boxShadow = '0px 0px  #6b593a, 0px 0px  #6b593a';
        });
  
  
        setTimeout(() => { // Attends la fin des transitions
        resolve(); // Resolution de la promesse
        }, 1200); // Délai
  });
  
  ///////////////////////////////////////////////////////////////////////////////// 
  // Déclenchement des trois transitions suivantes
  /////////////////////////////////////////////////////////////////////////////////
  
  // Transition de largeur/hauteur
  
  transitionPromise.then(() => { // Le formulaire passe a 80x80 pixels en 600ms
    formBox.style.transition = 'all 600ms ease-in-out';
    formBox.style.height = '80px';
    formBox.style.width = '80px';
  
  // Transition d'opacité
  
    setTimeout(() => {
      ldsGrid.style.transition = 'opacity 1100ms ease-in-out'; // L'animation GRID en css apparait en 2500ms
      ldsGrid.style.opacity = '1';
      }, 500); // Délai
  
  // Transition de visibilité
  
    setTimeout(() => {
      loadingText.style.transition = 'visibility 2500ms ease-in-out'; // L'animation TEXT loading en css apparait en 2500ms
      loadingText.style.visibility = 'visible';
      }, 0); // Délai

      // Redirection vers la page Wikipedia après 2500ms (2,5 secondes)
    setTimeout(() => {
      window.location.href = "https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal";
    }, 2500); // Délai
    
  });
  
  } else { // Sinon 
  
  // Affiche un message d'érreur si les conditions ne sont pas remplies 
  
    alert('Email ou mot de passe incorrect.');
  }
  
});