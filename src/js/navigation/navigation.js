var menuButton = document.querySelector('.header__menuBtn');

menuButton.addEventListener('click', function() {
   document.body.classList.toggle('navigation-is-active');
});