// Navigation
const menuToggle = document.querySelector('#menu-toggle');
const navlinks = document.querySelector('#nav-bar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('show');
    navlinks.classList.toggle('show');
});