function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  const typed = new Typed('#typevfx', {
    strings: ['Frontend Developer', 'Python Developer','FullStack Developer','WebApp Developer','UI/UX Developer','Tech Enthusiast'],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true,
  });

  