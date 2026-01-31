// Configuración de WhatsApp Única
const CONFIG_WP = {
    phone: "50239512701",
    message: "Hola Maestra Sol, quiero una consulta."
};

function getWhatsAppLink() {
    const baseUrl = "https://wa.me";
    return `${baseUrl}/${CONFIG_WP.phone}?text=${encodeURIComponent(CONFIG_WP.message)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const wpUrl = getWhatsAppLink();
    
    // Asigna el link a todos los botones y tarjetas con la clase .whatsapp-link
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        link.href = wpUrl;
        // Si es una tarjeta (article), el CSS se encarga de que todo el cuadro sea clicable
    });

    // Menú Móvil
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if(toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-menu a').forEach(l => {
            l.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // Año dinámico
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();
});

// Lazy Loading para imágenes
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
document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
