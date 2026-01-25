// Configuración de WhatsApp Centralizada
function getWhatsAppLink() {
    const phoneNumber = "573000000000"; // Tu número aquí
    const message = "Hola Maestra Sol, me gustaría agendar una consulta.";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
    return `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
}

// Asignar enlaces de WhatsApp
document.addEventListener("DOMContentLoaded", () => {
    const wpUrl = getWhatsAppLink();
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        link.href = wpUrl;
    });

    // Lógica del Menú Móvil (Nueva)
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if(toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Lazy Loading
const lazyImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            obs.unobserve(img);
        }
    });
});
lazyImages.forEach(img => observer.observe(img));

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Carrusel (Simple)
let slideIndex = 0;
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;
let interval;

function showSlide(n) {
    slideIndex = (n + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
}
function nextSlide() { showSlide(slideIndex + 1); }
function prevSlide() { showSlide(slideIndex - 1); }
function startCarousel() { interval = setInterval(nextSlide, 5000); }
function pauseCarousel() { clearInterval(interval); }
function resumeCarousel() { startCarousel(); }

startCarousel();