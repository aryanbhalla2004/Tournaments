const hamburger = document.getElementById("#hamburger-close");
const mainarea = document.querySelector(".main-content");
const navbar = document.querySelector(".nav-bar");

hamburger.addEventListener('click', e => {
  console.log("sdsds");
  // if(window.innerWidth <= 1225) {
  //   navbar.classList.toggle('removenav');
  // } else {
  //   mainarea.classList.toggle('paddingfix');
  //   navbar.classList.toggle('removenav');
  // }
  
});

window.addEventListener('resize', reportWindowSize);

function reportWindowSize() {
  if(window.innerWidth <= 1225) {
    mainarea.classList.add('paddingfix');
    navbar.classList.add('removenav');
  }

  if(window.innerWidth >= 1225) {
    mainarea.classList.remove('paddingfix');
    navbar.classList.remove('removenav');
  }
}
