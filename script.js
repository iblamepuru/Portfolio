document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        navToggle.querySelector('i').classList.toggle('fa-bars');
        navToggle.querySelector('i').classList.toggle('fa-times');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    });
    const sections = document.querySelectorAll('section[id]');
    const skillLevels = document.querySelectorAll('.skill-level');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const animationObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                if (id === 'skills') {
                    skillLevels.forEach(skill => {
                        skill.style.width = skill.getAttribute('data-level');
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, animationObserverOptions);
    
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        if (!this.action.includes('formspree.io')) {
            e.preventDefault();
            alert('Form submission is not set up. Please connect this to a backend service like Formspree.');
        }
    });
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollTotal) * 100;
        scrollProgressBar.style.width = progress + '%';
    });
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    function setTheme(theme) {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update icon
        if (theme === 'light') {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    const savedTheme = localStorage.getItem('theme') || 'dark'; 
    setTheme(savedTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
        setTheme(newTheme);
    });
    const typingElement = document.getElementById('typing-effect');
    const roles = ["Web Designer", "Embedded Systems Engineer", "UI/UX Enthusiast", "Tech Innovator"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    function type() {
        const currentRole = roles[roleIndex];
        let displayText = '';
        if (isDeleting) {
            displayText = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        typingElement.textContent = displayText;
        let typeSpeed = isDeleting ? 75 : 150;
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    type();
    const spotlight = document.getElementById('mouse-spotlight');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        if (window.matchMedia("(pointer: fine)").matches) {
            spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 100px, ${body.getAttribute('data-theme') === 'light' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.85)'} 500px)`;
        }
    });
});