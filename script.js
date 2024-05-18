document.addEventListener("DOMContentLoaded", function() {
  var menuBtn = document.getElementById('menuBtn');
  var navUl = document.getElementById('navUl');

  menuBtn.addEventListener('click', function() {
    navUl.classList.toggle('open');
  });
});
