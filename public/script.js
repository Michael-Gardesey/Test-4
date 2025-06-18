// Update DateTime
function updateDateTime() {
    const now = new Date();
    const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
    document.getElementById('current-datetime').textContent = formatted;
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime();

// Theme switching functionality
function initTheme() {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get theme from localStorage or system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle button click handler
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navigation and other functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Navigation active state and smooth scroll
    const navItems = document.querySelectorAll('.nav-item');
    
    // Handle home navigation
    const homeNav = document.querySelector('.nav-item[href="/"]');
    if (homeNav) {
        homeNav.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(item => item.classList.remove('active'));
            homeNav.classList.add('active');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            history.pushState({}, '', '/');
        });
    }

    // Handle other navigation items
    navItems.forEach(item => {
        if (item.getAttribute('href') !== '/') {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(item.getAttribute('href'));
                if (target) {
                    navItems.forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Check scroll position to update active nav item
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const correspondingNav = document.querySelector(`.nav-item[href="#${section.id}"]`);
                if (correspondingNav) {
                    navItems.forEach(item => item.classList.remove('active'));
                    correspondingNav.classList.add('active');
                }
            }
        });

        // If at the top of the page, activate home nav
        if (scrollPosition < 100) {
            navItems.forEach(item => item.classList.remove('active'));
            document.querySelector('.nav-item[href="/"]').classList.add('active');
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted');
    });
}
