// script.js

// Affichage d'un message de bienvenue après 2 secondes
window.onload = () => {
    setTimeout(() => {
      alert("Bienvenue sur mon site personnel !");
    }, 2000); // Affiche après 2 secondes
  };
  
  // Animation simple pour rendre le texte "À propos" visible avec un effet
  document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.getElementById("about");
    aboutSection.style.opacity = 0;
    aboutSection.style.transition = "opacity 1s";
  
    setTimeout(() => {
      aboutSection.style.opacity = 1;
    }, 500); // L'animation commence après 0.5 seconde
  });
  