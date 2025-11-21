const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

function getWhatsAppLink() {
    const phoneNumber = "+573000000000";
    const message = "¡Hola! Me interesa una consulta, ¿me puedes dar más información?";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Carrusel simple
const slides = document.getElementById('slides');
let index = 0;
function update() { slides.style.transform = `translateX(-${index * 100}%)` }
function nextSlide() { index = (index + 1) % 3; update() }
function prevSlide() { index = (index + 2) % 3; update() }
setInterval(nextSlide, 6000);