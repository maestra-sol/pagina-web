// Función segura para enviar eventos a Google Tag Manager / Google Ads
function trackWspClick(origin) {
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'whatsapp_conversion_click',
            'click_origin': origin || 'unknown'
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Menú Móvil
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-menu a').forEach(l => {
            l.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // Año dinámico en footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Scroll suave para anclas internas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Delegación de clic en toda la tarjeta de servicio
    document.querySelectorAll('.card.servicio-img').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const btn = card.querySelector('.solar-card-btn') || card.querySelector('.card-btn-wsp') || card.querySelector('a');
            if (btn) btn.click();
        });
    });

    // Control de visibilidad de CTAs flotantes al hacer scroll
    const heroCta = document.getElementById('wp-hero-cta');
    const stickyBar = document.querySelector('.mobile-sticky-bar');
    const floatingCta = document.querySelector('.floating-cta');

    function handleFloatingVisibility() {
        let isPastHero = window.scrollY > 280;
        if (heroCta) {
            const rect = heroCta.getBoundingClientRect();
            isPastHero = rect.bottom < 40 || window.scrollY > 280;
        }

        if (isPastHero) {
            if (stickyBar) stickyBar.classList.add('is-visible');
            if (floatingCta) floatingCta.classList.add('is-visible');
        } else {
            if (stickyBar) stickyBar.classList.remove('is-visible');
            if (floatingCta) floatingCta.classList.remove('is-visible');
        }
    }

    window.addEventListener('scroll', handleFloatingVisibility, { passive: true });
    handleFloatingVisibility();

    // ==========================================
    // REPRODUCTOR DE NOTAS DE VOZ (TESTIMONIOS)
    // ==========================================
    function initAudioTestimonials() {
        const audioCards = document.querySelectorAll('.audio-card');
        if (!audioCards.length) return;

        function formatTime(seconds) {
            if (isNaN(seconds) || seconds < 0) return '0:00';
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m}:${s < 10 ? '0' : ''}${s}`;
        }

        audioCards.forEach(card => {
            const audio = card.querySelector('audio');
            const playBtn = card.querySelector('.audio-play-btn');
            const progressTrack = card.querySelector('.audio-progress-track');
            const progressFill = card.querySelector('.audio-progress-fill');
            const timeCurrent = card.querySelector('.audio-time-current');
            const timeDuration = card.querySelector('.audio-time-duration');

            if (!audio || !playBtn) return;

            // Actualizar duración al cargar metadatos
            audio.addEventListener('loadedmetadata', () => {
                if (timeDuration && audio.duration) {
                    timeDuration.textContent = formatTime(audio.duration);
                }
            });

            // Reproducir / Pausar
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (audio.paused) {
                    // Detener cualquier otro audio reproduciéndose en la página
                    document.querySelectorAll('.audio-card audio').forEach(otherAudio => {
                        if (otherAudio !== audio && !otherAudio.paused) {
                            otherAudio.pause();
                        }
                    });
                    audio.play().catch(err => {
                        console.warn('Audio play prevented:', err);
                    });
                } else {
                    audio.pause();
                }
            });

            audio.addEventListener('play', () => {
                card.classList.add('is-playing');
                playBtn.setAttribute('aria-label', 'Pausar testimonio en audio');
            });

            audio.addEventListener('pause', () => {
                card.classList.remove('is-playing');
                playBtn.setAttribute('aria-label', 'Reproducir testimonio en audio');
            });

            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    const pct = (audio.currentTime / audio.duration) * 100;
                    if (progressFill) progressFill.style.width = `${pct}%`;
                    if (progressTrack) progressTrack.setAttribute('aria-valuenow', Math.round(pct));
                    if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
                }
            });

            audio.addEventListener('ended', () => {
                card.classList.remove('is-playing');
                if (progressFill) progressFill.style.width = '0%';
                if (timeCurrent) timeCurrent.textContent = '0:00';
                audio.currentTime = 0;
            });

            // Adelantar / Retroceder al hacer clic en la barra de progreso
            if (progressTrack) {
                progressTrack.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const rect = progressTrack.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                    if (audio.duration) {
                        audio.currentTime = ratio * audio.duration;
                        const pct = ratio * 100;
                        if (progressFill) progressFill.style.width = `${pct}%`;
                        if (timeCurrent) timeCurrent.textContent = formatTime(audio.currentTime);
                    }
                });

                // Soporte de accesibilidad por teclado
                progressTrack.addEventListener('keydown', (e) => {
                    if (!audio.duration) return;
                    if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
                    } else if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        audio.currentTime = Math.max(0, audio.currentTime - 5);
                    } else if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        playBtn.click();
                    }
                });
            }
        });
    }

    initAudioTestimonials();
});

// Número global de WhatsApp: código de país + número, sin + ni espacios.
const WHATSAPP_NUMBER = "529992368419";

// Actualizar todos los enlaces de WhatsApp de la página.
document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
    const url = new URL(link.href);
    url.pathname = "/" + WHATSAPP_NUMBER;
    link.href = url.toString();
});
