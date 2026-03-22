// ===== Typing Animation =====
const typingText = document.querySelector('.typing-text');
const words = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Open Source Contributor'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeAnimation() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeAnimation, typingSpeed);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typingText) {
        setTimeout(typeAnimation, 1000);
    }
});

// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', updateNavbar);

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', toggleScrollTop);

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(
    '.section-header, .skill-category, .project-card, .about-content > div, .contact-content > div'
);

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
revealElements.forEach(element => {
    element.classList.add('reveal');
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Open email client with form data
        const emailSubject = encodeURIComponent(data.subject);
        const emailBody = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
        const mailtoLink = `mailto:mikubel5@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        
        window.location.href = mailtoLink;
        
        showNotification('Email client opened! Please send the email.', 'success');
        contactForm.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Counter Animation for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const sectionTop = aboutSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        countersAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const suffix = stat.textContent.replace(/[0-9]/g, '');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + suffix;
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ===== Project Card Hover Effect Enhancement =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        projectCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
                otherCard.style.transform = 'scale(0.98)';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        projectCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
            otherCard.style.transform = '';
        });
    });
});

// ===== Skill Tags Animation =====
const skillCategories = document.querySelectorAll('.skill-category');

skillCategories.forEach((category, index) => {
    category.style.animationDelay = `${index * 0.1}s`;
});

// ===== Parallax Effect for Hero =====
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        if (heroSection) {
            heroSection.style.backgroundPositionY = `${parallax}px`;
        }
    }
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }

    // Arrow keys for scroll-to-top
    if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
    }
});

// ===== Preloader (Optional Enhancement) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Console message for developers
console.log('%c👋 Hey there, developer!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 14px; color: #64748b;');
console.log('%cFeel free to connect with me!', 'font-size: 14px; color: #22d3ee;');
