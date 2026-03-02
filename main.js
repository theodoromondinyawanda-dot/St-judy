// Toggle Overlay Menu
const menuBtn = document.getElementById('menuBtn');
const navOverlay = document.getElementById('navOverlay');

menuBtn.addEventListener('click', () => {
    navOverlay.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => navOverlay.classList.remove('open'));
});

// Detect active page for animations
const observerOptions = { threshold: 0.6 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.page').forEach(page => observer.observe(page));
