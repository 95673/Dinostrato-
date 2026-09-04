// SCRIPT.JS - site_editado

/* SLIDESHOW */

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

const showSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
};

const nextSlide = () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
};

const prevSlide = () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
};

// Mostrar slide inicial
showSlide(currentSlide);

// Botões navegação
document.querySelector('.next').addEventListener('click', () => {
  nextSlide();
  resetSlideshowTimer();
});

document.querySelector('.prev').addEventListener('click', () => {
  prevSlide();
  resetSlideshowTimer();
});

// Auto slide a cada 5s
let slideshowTimer = setInterval(nextSlide, 5000);

const resetSlideshowTimer = () => {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(nextSlide, 5000);
};

/* VALIDAÇÃO DO FORMULÁRIO */

const form = document.getElementById('contactForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = form.name.value.trim();
  const email = form.email.value.trim();
  const assunto = form.subject.value.trim();
  const mensagem = form.message.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome === '') {
    alert('Por favor, preencha o seu nome.');
    form.name.focus();
    return;
  }
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    form.email.focus();
    return;
  }
  if (assunto === '') {
    alert('Por favor, escreva o assunto.');
    form.subject.focus();
    return;
  }
  if (mensagem === '') {
    alert('Por favor, insira a sua
