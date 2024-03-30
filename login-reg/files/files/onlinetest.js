const menuIcon = document.querySelector(".menu-nav-ico");
const menuNav = document.querySelector(".main-nav");
const menuHeader = document.querySelector(".main-header");
const navLinks = document.querySelectorAll(".menu-line");
const logo = document.querySelector(".logo img");

menuIcon.addEventListener("click", function () {
  for(let i = 0; i < 3; i++){
    navLinks[i].classList.toggle("animateMenu");
  }
  menuIcon.classList.toggle("mniborder");
  menuNav.classList.toggle("mnheight");
  menuHeader.classList.toggle("mhbg");
  setTimeout(function() {
    logo.classList.toggle("animate-logo-img");
  }, 150)
});