const historia = document.getElementById('historia');
const juego = document.getElementById('juego');
const navButtons = document.querySelectorAll('button');

function aJugar(){
    historia.style.display = "none" ;
    juego.style.display = "block" ;
}

function aHistoria(){
    juego.style.display = "none" ;
    historia.style.display = "block" ;
    button.historia.style.backgroundcolor = "green" 
}

for (const btn of navButtons) {
    btn.addEventListener('click', function() {
      // Remover la clase 'active' de todos los botones de navegación
      navButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      // Agregar la clase 'active' al botón que se hizo clic
      this.classList.add('active');
    });
  }