// Mobile pop up menu, sets up elements to target
const openMenu = document.querySelector(".mobileOpenMenu");
const closeMenu = document.querySelector(".mobileCloseMenu");
const navMenu = document.querySelector(".navPoints");

// Click to open menu 
openMenu.addEventListener('click', () => {
    navMenu.classList.add("jsMenuToggle");
});

// Click to Close menu
closeMenu.addEventListener('click', () => {
    navMenu.classList.remove("jsMenuToggle");
});