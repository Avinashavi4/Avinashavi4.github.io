// Smooth scrolling and active state management (your existing code)
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
  emailjs.init("your-public-key"); // Replace with your Public Key (from EmailJS dashboard)
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page refresh

  emailjs.sendForm('service_cfmgrnf', 'template_1ocqkt8', this)
    .then(function() {
      alert('Message sent successfully!');
      document.getElementById('contact-form').reset(); // Clear form
    }, function(error) {
      alert('Failed to send message: ' + JSON.stringify(error));
    });
});