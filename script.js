// Preloader Sequence
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  const hyperspaceAnimation = document.getElementById('hyperspace-animation');
  const welcomeMessage = document.getElementById('welcome-message');

  setTimeout(() => {
    hyperspaceAnimation.style.display = 'none';
    welcomeMessage.style.display = 'block';
  }, 3000);

  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 500);
  }, 5000);
});

// Code Rain Effect
const canvas = document.getElementById('code-rain');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = '01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
  drops[x] = 1;
}

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ddeb';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 33);

// Particle Background
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#00ddeb' },
    shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: '#00ddeb', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});

// Digital Clock with Date
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const clockElement = document.getElementById('digital-clock');
  if (clockElement) {
    clockElement.innerHTML = `${hours}:${minutes}:${seconds}<br>${date}`;
  }
}
setInterval(updateClock, 1000);
updateClock();

// Text-to-Speech Function
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
  return utterance;
}

// Extract Content from Website
const contentData = {
  about: document.getElementById('about-content')?.textContent || '',
  education: Array.from(document.querySelectorAll('#education .education-card')).map(card => {
    const title = card.querySelector('h3')?.textContent || '';
    const details = Array.from(card.querySelectorAll('p')).map(p => p.textContent).join(' ');
    return `${title}. ${details}`;
  }).join(' '),
  experience: Array.from(document.querySelectorAll('#experience .experience-card')).map(card => {
    const title = card.querySelector('h3')?.textContent || '';
    const company = card.querySelector('p:nth-child(2)')?.textContent || '';
    const duration = card.querySelector('p:nth-child(3)')?.textContent || '';
    const details = Array.from(card.querySelectorAll('ul li')).map(li => li.textContent).join(' ');
    return `${title} at ${company}, ${duration}. ${details}`;
  }).join(' '),
  skills: Array.from(document.querySelectorAll('#skills .skill-card span')).map(span => span.textContent).join(', '),
  projects: Array.from(document.querySelectorAll('#projects .project-card')).map(card => {
    const title = card.querySelector('h3')?.textContent || '';
    const duration = card.querySelector('p:nth-child(3)')?.textContent || '';
    const summary = card.querySelector('p:nth-child(4)')?.textContent || '';
    const details = card.querySelector('.details-content p')?.textContent || '';
    return `${title}, ${duration}. ${summary} ${details}`;
  }).join(' '),
  certifications: Array.from(document.querySelectorAll('#certifications .certification-card h3')).map(h3 => h3.textContent).join(', ')
};

// Voice Recognition with Advanced Features
const voiceControl = document.getElementById('voice-control');
const voiceTooltip = document.getElementById('voice-tooltip');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  voiceControl.disabled = true;
  voiceTooltip.textContent = 'Voice recognition not supported in this browser. Please use Chrome.';
  voiceTooltip.classList.add('show');
  speak('Voice recognition not supported in this browser. Please use Chrome.');
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let contactFormState = null;
  let contactFormData = {};

  function startRecognition() {
    recognition.start();
    voiceControl.classList.add('active');
    voiceTooltip.textContent = 'Listening...';
    voiceTooltip.classList.add('show');
  }

  voiceControl.addEventListener('click', () => {
    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      voiceTooltip.textContent = 'Voice recognition requires a secure context (HTTPS or localhost).';
      voiceTooltip.classList.add('show');
      speak('Voice recognition requires a secure context, HTTPS or localhost.');
      return;
    }

    try {
      if (!contactFormState) {
        startRecognition();
        speak('How can I help you?');
      } else {
        startRecognition();
      }
    } catch (error) {
      voiceTooltip.textContent = 'Error starting voice recognition. Please ensure microphone access.';
      voiceTooltip.classList.add('show');
      speak('Error starting voice recognition. Please ensure microphone access.');
      console.error('Voice Recognition Error:', error);
    }
  });

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    voiceControl.classList.remove('active');
    voiceTooltip.classList.remove('show');

    // Handle Contact Form Automation
    if (contactFormState) {
      switch (contactFormState) {
        case 'name':
          contactFormData.name = command;
          document.getElementById('contact-name').value = command;
          contactFormState = 'email';
          voiceTooltip.textContent = 'Please say your email.';
          voiceTooltip.classList.add('show');
          speak('Please say your email.');
          setTimeout(startRecognition, 1000);
          break;
        case 'email':
          contactFormData.email = command;
          document.getElementById('contact-email').value = command;
          contactFormState = 'message';
          voiceTooltip.textContent = 'Please say your message.';
          voiceTooltip.classList.add('show');
          speak('Please say your message.');
          setTimeout(startRecognition, 1000);
          break;
        case 'message':
          contactFormData.message = command;
          document.getElementById('contact-message').value = command;
          contactFormState = null;
          voiceTooltip.textContent = 'Sending your message...';
          voiceTooltip.classList.add('show');
          speak('Sending your message.');

          // Send email using EmailJS
          const templateParams = {
            name: contactFormData.name,
            email: contactFormData.email,
            message: contactFormData.message
          };

          emailjs.send('service_uiawcu8', 'template_02kipvf', templateParams)
            .then(() => {
              formMessage.textContent = 'Message sent successfully!';
              formMessage.classList.add('show', 'success');
              contactForm.reset();
              contactFormData = {};
              speak('Message sent successfully.');
            }, (error) => {
              formMessage.textContent = 'Failed to send message. Please try again later.';
              formMessage.classList.add('show', 'error');
              speak('Failed to send message. Please try again later.');
              console.error('EmailJS Error:', error);
            });
          break;
      }
      return;
    }

    // Handle Navigation and Information Retrieval
    const sections = ['home', 'about', 'education', 'experience', 'skills', 'projects', 'certifications', 'contact'];
    let sectionFound = false;

    // Navigation Commands
    if (command.includes('about me') || command.includes('who are you') || command.includes('tell me about avinash')) {
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
      voiceTooltip.textContent = 'Navigating to About section.';
      voiceTooltip.classList.add('show');
      speak('Navigating to About section. Here is some information about Avinash: ' + contentData.about);
      sectionFound = true;
    } else if (command.includes('show contact') || command.includes('contact me') || command.includes('send a message') || command.includes('send information by contact')) {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
      voiceTooltip.textContent = 'Navigating to Contact section. Let’s send a message.';
      voiceTooltip.classList.add('show');
      speak('Navigating to Contact section. Let’s send a message. Please say your name.');
      contactFormState = 'name';
      contactFormData = {};
      setTimeout(startRecognition, 1000);
      sectionFound = true;
    } else {
      const section = sections.find(s => command.includes(s));
      if (section) {
        document.querySelector(`#${section}`).scrollIntoView({ behavior: 'smooth' });
        voiceTooltip.textContent = `Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)} section.`;
        voiceTooltip.classList.add('show');
        speak(`Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)} section. Here is the information: ${contentData[section]}`);
        sectionFound = true;
      }
    }

    // Information Retrieval Commands
    if (!sectionFound) {
      if (command.includes('tell me about') || command.includes('i need to know about') || command.includes('what are') || command.includes('who is avinash')) {
        if (command.includes('projects') || command.includes('project')) {
          voiceTooltip.textContent = 'Here are Avinash’s projects.';
          voiceTooltip.classList.add('show');
          speak('Here are Avinash’s projects: ' + contentData.projects);
          document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
          sectionFound = true;
        } else if (command.includes('education')) {
          voiceTooltip.textContent = 'Here is Avinash’s education.';
          voiceTooltip.classList.add('show');
          speak('Here is Avinash’s education: ' + contentData.education);
          document.querySelector('#education').scrollIntoView({ behavior: 'smooth' });
          sectionFound = true;
        } else if (command.includes('experience')) {
          voiceTooltip.textContent = 'Here is Avinash’s experience.';
          voiceTooltip.classList.add('show');
          speak('Here is Avinash’s experience: ' + contentData.experience);
          document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
          sectionFound = true;
        } else if (command.includes('skills')) {
          voiceTooltip.textContent = 'Here are Avinash’s skills.';
          voiceTooltip.classList.add('show');
          speak('Here are Avinash’s skills: ' + contentData.skills);
          document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
          sectionFound = true;
        } else if (command.includes('certifications') || command.includes('certification')) {
          voiceTooltip.textContent = 'Here are Avinash’s certifications.';
          voiceTooltip.classList.add('show');
          speak('Here are Avinash’s certifications: ' + contentData.certifications);
          document.querySelector('#certifications').scrollIntoView({ behavior: 'smooth' });
          sectionFound = true;
        } else if (command.includes('about avinash') || command.includes('who is avinash')) {
          voiceTooltip.textContent = 'Here is information about Avinash.';
          voiceTooltip.classList.add('show');
          speak('Here is information about Avinash: ' + contentData.about);
          document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
          sectionFound = true;
        }
      }
    }

    if (!sectionFound) {
      voiceTooltip.textContent = 'I cannot find this.';
      voiceTooltip.classList.add('show');
      speak('I cannot find this.');
    }
  };

  recognition.onerror = (event) => {
    voiceControl.classList.remove('active');
    voiceTooltip.classList.remove('show');
    contactFormState = null;
    if (event.error === 'no-speech') {
      voiceTooltip.textContent = 'No speech detected. Please try again.';
      speak('No speech detected. Please try again.');
    } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      voiceTooltip.textContent = 'Microphone access denied. Please allow microphone access.';
      speak('Microphone access denied. Please allow microphone access.');
    } else if (event.error === 'network') {
      voiceTooltip.textContent = 'Network error. Please check your internet connection.';
      speak('Network error. Please check your internet connection.');
    } else {
      voiceTooltip.textContent = `Error: ${event.error}. Please try again.`;
      speak(`Error: ${event.error}. Please try again.`);
    }
    voiceTooltip.classList.add('show');
    console.error('Voice Recognition Error:', event.error);
  };

  recognition.onend = () => {
    voiceControl.classList.remove('active');
    if (!contactFormState) {
      voiceTooltip.classList.remove('show');
    }
  };
}

// Details Toggle
document.querySelectorAll('.details-btn').forEach(button => {
  button.addEventListener('click', () => {
    const detailsContent = button.nextElementSibling;
    button.classList.toggle('active');
    detailsContent.classList.toggle('show');
  });
});

// Typed Tagline
const typed = new Typed('#typed', {
  strings: ["Application Developer", "Tech Innovator", "Problem Solver"],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
  showCursor: false,
});

// Contact Form Manual Submission with EmailJS
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('input[name="name"]').value.trim();
  const email = contactForm.querySelector('input[name="email"]').value.trim();
  const message = contactForm.querySelector('textarea[name="message"]').value.trim();

  // Validation
  if (name === '' || email === '' || message === '') {
    formMessage.textContent = 'Please fill in all fields.';
    formMessage.classList.add('show', 'error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.classList.add('show', 'error');
    return;
  }

  // Add loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  // Send email using EmailJS
  const templateParams = {
    name: name,
    email: email,
    message: message
  };

  emailjs.send('service_uiawcu8', 'template_ar2poon', templateParams)
    .then((response) => {
      formMessage.textContent = 'Message sent successfully!';
      formMessage.classList.add('show', 'success');
      contactForm.reset();
    }, (error) => {
      formMessage.textContent = 'Failed to send message. Please try again later.';
      formMessage.classList.add('show', 'error');
      console.error('EmailJS Error:', error);
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    });
});

// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 25,
  speed: 400,
  glare: true,
  "max-glare": 0.5,
});