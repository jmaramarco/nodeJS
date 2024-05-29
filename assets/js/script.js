document.addEventListener("DOMContentLoaded", function() {
  var menuBtn = document.getElementById('menuBtn');
  var navUl = document.getElementById('navUl');

  menuBtn.addEventListener('click', function() {
    navUl.classList.toggle('open');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var popup = document.getElementById('loginPopup');
  var btn = document.getElementById('registroAtletas');
  var span = document.getElementsByClassName('close')[0];

  btn.onclick = function() {
      popup.style.display = 'block';
  }

  span.onclick = function() {
      popup.style.display = 'none';
  }

  window.onclick = function(event) {
      if (event.target == popup) {
          popup.style.display = 'none';
      }
  }

  // Redirigir a formulario.html al hacer clic en "Crear cuenta"
  var createAccountLink = document.getElementById('createAccountLink');
  
  createAccountLink.onclick = function() {
      window.location.href = 'formulario.html';
  }
});
