// Configuración de WhatsApp Centralizada
function getWhatsAppLink() {
    const phoneNumber = "+50239512701";
    const message = "Hola Maestra Sol, quiero apartar mi cupo.";
    const baseUrl = "https://wa.me";
    return `${baseUrl}/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const wpUrl = getWhatsAppLink();
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        link.href = wpUrl;
        link.classList.add('whatsapp-pulse');
        if (link.querySelector('i')) {
            // conserva el icono
            link.innerHTML = '<i class="fab fa-whatsapp"></i> Apartar mi Cupo Ya';
        } else if (link.id === 'wp-flotante') {
            link.title = 'Apartar mi Cupo Ya';
            link.setAttribute('aria-label', 'Apartar mi Cupo Ya');
        } else {
            link.textContent = 'Apartar mi Cupo Ya';
        }
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