<script>
	const header = document.querySelector("header");
const logo = document.querySelector(".logo-site");
const logoBack = document.querySelector(".lilly-logo-back");
const lilly = document.querySelector(".lilly-logo");
const nav = document.querySelectorAll("nav li");
const navbar = document.querySelector("nav");
const titlePort = document.querySelector(".title-portfolio");
const titlePort2 = document.querySelector(".title-portfolio2");
const portfolio2 = document.querySelector(".portfolio2");
const portfolio = document.querySelector(".portfolio");
const image1 = document.querySelector(".image1");
const image2 = document.querySelector(".image2");
const socialsLink = document.querySelectorAll(".socials a");

/////////////////////////////////////
///////   Header Animations /////////
/////////////////////////////////////

let tl = gsap.timeline({ paused: false });

if (screen.width >= 768) {
  tl.from(logoBack, { duration: 0.5, y: 50 }, "+=0.5");
  tl.from(lilly, { duration: 0.2, y: 100 }, "+=0.1");
  tl.from(portfolio2, { duration: 0.2, y: 120 }, "+=0.1");
  tl.from(portfolio, { duration: 0.2, y: 120 }, "+=0.1");
  socialsLink.forEach((link) => {
    tl.from(link, { duration: 0.1, y: 50 }, "+=0.1");
  });
  tl.from(image2, { duration: 1, opacity: 0 }, "+=0.1");
  tl.from(image1, { duration: 1, opacity: 0 }, "+=0.1");
  nav.forEach((li) => {
    tl.from(li, { duration: 0.1, y: -70 }, "+=0.1");
  });
}

if (screen.width < 768) {
  tl.from(logoBack, { duration: 0.5, y: 50 }, "+=0.5");
  tl.from(lilly, { duration: 0.2, y: 100 }, "+=0.1");
  tl.from(portfolio2, { duration: 0.2, y: 120 }, "+=0.1");
  tl.from(portfolio, { duration: 0.2, y: 120 }, "+=0.1");
  socialsLink.forEach((link) => {
    tl.from(link, { duration: 0.1, y: 50 }, "+=0.1");
  });
  nav.forEach((li) => {
    tl.from(li, { duration: 0.1, y: -70 }, "+=0.2");
  });
}

//////////////////////////////////////////////
//////// Navbar animation on scroll //////////
/////////////////////////////////////////////

window.addEventListener("scroll", () => {
  showNav();
  if (window.innerWidth > 1024) {
    animTitle();
  }
});

function showNav() {
  if (window.scrollY > header.offsetHeight && window.innerWidth > 767) {
    navbar.classList.add("foo");
    logo.classList.add("foo2");
    logo.style.position = "fixed";
    logo.style.top = "10px";
    logo.style.width = "250px";
    logo.style.left = "20px";
    logo.style.height = "30px";
    lilly.style.fontSize = "1.5rem";
    lilly.style.width = "250px";
    lilly.style.height = "30px";
    logoBack.style.height = "15px";
  } else if (window.scrollY > header.offsetHeight && window.innerWidth < 768) {
    navbar.classList.add("foo");
    navbar.style.height = "70px";
    navbar.style.alignItems = "flex-end";
    logo.classList.add("foo2");
    logo.style.position = "fixed";
    logo.style.top = "10px";
    logo.style.left = "50%";
    logo.style.transform = "translateX(-50%)";
    logo.style.width = "250px";
    logo.style.height = "30px";
    lilly.style.fontSize = "1.5rem";
    lilly.style.width = "250px";
    lilly.style.height = "30px";
    // lilly.style.left = "50%";
    // lilly.style.transform = "translateX(-50%)";
    logoBack.style.height = "15px";
  } else if (window.scrollY < header.offsetHeight && window.innerWidth < 768) {
    navbar.classList.remove("foo");
    logo.classList.remove("foo2");
    navbar.style.height = "5vh";
    navbar.style.alignItems = "center";
    logo.style.position = "relative";
    logo.style.top = "-40%";
    logo.style.left = "50%";
    logo.style.transform = "translateX(-50%)";
    logo.style.width = "320px";
    logo.style.height = "45px";
    lilly.style.fontSize = "2.2rem";
    lilly.style.width = "320px";
    lilly.style.height = "45px";
    // lilly.style.left = "50%";
    // lilly.style.transform = "translateX(-50%)";
    logoBack.style.height = "45px";
  } else {
    logo.style.position = "relative";
    logo.style.top = "-50%";
    logo.style.left = "25%";
    logo.style.width = "320px";
    logo.style.height = "45px";
    lilly.style.fontSize = "2.2rem";
    lilly.style.width = "320px";
    lilly.style.height = "45px";
    logoBack.style.height = "20px";
    navbar.classList.remove("foo");
    logo.classList.remove("foo2");
  }
}

///////////////////////////////////////////////////////
///////// Animation title "portfolio" on scroll //////
/////////////////////////////////////////////////////

function animTitle() {
  if (window.scrollY > header.offsetHeight && window.innerWidth > 1024) {
    titlePort.style.position = "fixed";
    titlePort.style.top = "40%";
    titlePort2.style.position = "fixed";
    titlePort2.style.top = "35%";
    titlePort.classList.add("foo2");
    titlePort2.classList.add("foo2");
  } else {
    titlePort.style.position = "relative";
    titlePort.style.top = "20%";
    titlePort2.style.position = "relative";
    titlePort2.style.top = "35%";
    titlePort.classList.remove("foo2");
    titlePort2.classList.remove("foo2");
  }
}

///////////////////////////////////////////////////
///////// Reload page when page is resize /////////
/////////////////////////////////////////////////

window.addEventListener("resize", () => {
   google.script.run
      .withSuccessHandler(function(url){
        window.open(url,'_top');
      })
      .getScriptURL();
});

</script>
