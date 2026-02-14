// Password Protection
const SECRET_PASSWORD = "iloveyou"; // Change this to your desired password

function initPasswordProtection() {
    const passwordScreen = document.getElementById('passwordScreen');
    const mainContent = document.getElementById('mainContent');
    const passwordInput = document.getElementById('passwordInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const errorMsg = document.getElementById('errorMsg');

    // Check if already unlocked (session storage)
    if (sessionStorage.getItem('unlocked') === 'true') {
        passwordScreen.style.display = 'none';
        mainContent.style.display = 'block';
        initMainContent();
        return;
    }

    function tryUnlock() {
        const enteredPassword = passwordInput.value.toLowerCase().trim();

        if (enteredPassword === SECRET_PASSWORD) {
            sessionStorage.setItem('unlocked', 'true');
            passwordScreen.style.opacity = '0';
            passwordScreen.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                passwordScreen.style.display = 'none';
                mainContent.style.display = 'block';
                mainContent.style.opacity = '0';
                mainContent.style.transition = 'opacity 0.5s ease';

                setTimeout(() => {
                    mainContent.style.opacity = '1';
                    initMainContent();
                }, 50);
            }, 500);
        } else {
            errorMsg.textContent = '💔 Wrong password, try again...';
            passwordInput.value = '';
            passwordInput.style.borderColor = '#e74c3c';

            setTimeout(() => {
                passwordInput.style.borderColor = '#ffd3e0';
                errorMsg.textContent = '';
            }, 2000);
        }
    }

    unlockBtn.addEventListener('click', tryUnlock);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') tryUnlock();
    });
}

function initMainContent() {
    createFloatingHearts();
    generateReasons();
    initScrollAnimations();
    initEnvelope();
    initSparkles();
    initSmoothScroll();
    initParallax();
}

// Floating Hearts Animation
function createFloatingHearts() {
    const container = document.getElementById('hearts');
    const hearts = ['💕', '❤️', '💗', '💖', '💝', '💘', '🌹', '✨'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 13000);
    }, 500);
}

// Scroll Animations for Timeline
function initScrollAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const reasonCards = document.querySelectorAll('.reason-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => observer.observe(item));
    reasonCards.forEach(card => observer.observe(card));
}

// Envelope Animation
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');
    
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.style.display = 'none';
            letterContent.style.display = 'block';
            setTimeout(() => {
                letterContent.classList.add('visible');
            }, 100);
        }, 500);
    });
}

// Generate Reasons Cards
function generateReasons() {
    const reasons = [
        { icon: '😊', text: 'Your beautiful smile that lights up my world' },
        { icon: '💪', text: 'The way you support me through everything' },
        { icon: '😂', text: 'Your laugh that makes my heart skip a beat' },
        { icon: '🤗', text: 'The warmth of your hugs that feel like home' },
        { icon: '💭', text: 'How you understand me without words' },
        { icon: '🌟', text: 'The way you make ordinary moments magical' },
        { icon: '❤️', text: 'Your kind and loving heart' },
        { icon: '🎯', text: 'How you inspire me to be better every day' },
        { icon: '🌈', text: 'The colors you bring into my life' }
    ];
    
    const container = document.getElementById('reasons');
    
    reasons.forEach((reason, index) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="reason-icon">${reason.icon}</div>
            <p class="reason-text">${reason.text}</p>
        `;
        container.appendChild(card);
    });
}

// Sparkle Effect on Mouse Move
function initSparkles() {
    let lastSparkle = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 50) return;
        lastSparkle = now;
        
        if (Math.random() > 0.7) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            sparkle.style.background = ['#ffd700', '#ff6b9d', '#ff9a9e', '#fecfef'][Math.floor(Math.random() * 4)];
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax Effect for Hero
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initPasswordProtection();
    console.log('💕 Happy Valentine\'s Day! 💕');
});

