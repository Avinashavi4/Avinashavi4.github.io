// Smooth scrolling and active state management
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('nav ul li a').forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Highlight the active section on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
});

// EmailJS integration
(function() {
  emailjs.init("FhDbrbYN5lgpr7OQZ") // Replace with your actual EmailJS Public Key
    .then(() => {
      console.log("EmailJS initialized successfully!");
    }, (error) => {
      console.error("EmailJS initialization failed:", error);
    });
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page refresh

  emailjs.sendForm('service_cfmgrnf', 'template_1z5fkpl', this)
    .then(function() {
      alert('Message sent successfully!');
      document.getElementById('contact-form').reset(); // Clear form
    }, function(error) {
      alert('Failed to send message: ' + JSON.stringify(error));
    });
});