// Add this to your existing script.js

// Navigation active state
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Optional: Scroll behavior
let lastScroll = 0;
const nav = document.querySelector('.nav-container');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.transform = 'translateX(-50%)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        nav.style.transform = 'translate(-50%, 100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateX(-50%)';
    }
    
    lastScroll = currentScroll;
});
