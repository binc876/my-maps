const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('navbar a');

navLinks.forEach(element => {
    if(element.href.includes(`${activePage}`)) {
        element.classList.add('active');
    }
});