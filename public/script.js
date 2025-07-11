function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// 4D CARD TILT EFFECT
function init4DTilt() {
    const cards = document.querySelectorAll('.details-container, .color-container, .contact-info-container');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
        card.classList.add('card-3d-tilt');
    });
}

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateX = ((mouseY - centerY) / rect.height) * -15;
    const rotateY = ((mouseX - centerX) / rect.width) * 15;
    
    card.style.transform = `
        perspective(1000px)
        translateZ(20px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
    `;
    
    // Add dynamic glow based on mouse position
    const glowIntensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 20) / 20;
    card.style.boxShadow = `
        0 ${10 + glowIntensity * 20}px ${30 + glowIntensity * 30}px rgba(44, 62, 80, ${0.2 + glowIntensity * 0.3}),
        0 ${5 + glowIntensity * 10}px ${15 + glowIntensity * 15}px rgba(52, 73, 94, ${0.1 + glowIntensity * 0.2})
    `;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = '';
    card.style.boxShadow = '';
}

// GAMING CLICK EFFECTS
function addGameEffects() {
    const cards = document.querySelectorAll('.details-container, .color-container');
    
    cards.forEach(card => {
        card.addEventListener('click', createRippleEffect);
    });
}

function createRippleEffect(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('div');
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    
    card.style.position = 'relative';
    card.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// PARTICLE EFFECTS FOR HOVER
function createParticles(element) {
    const particles = [];
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = `rgba(${44 + Math.random() * 50}, ${62 + Math.random() * 50}, 80, 0.8)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `particle-float-${i} 2s ease-out forwards`;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = Math.random() * rect.width + 'px';
        particle.style.top = Math.random() * rect.height + 'px';
        
        element.style.position = 'relative';
        element.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// Add particle animations
for (let i = 0; i < 5; i++) {
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particle-float-${i} {
            0% {
                transform: translateY(0px) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-${50 + Math.random() * 50}px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Add particle effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.details-container, .color-container');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => createParticles(card));
    });
});

// IMPROVED BUTTON INTERACTIONS
function initButtonInteractions() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Add touch support
        button.addEventListener('touchstart', handleButtonPress, { passive: true });
        button.addEventListener('touchend', handleButtonRelease, { passive: true });
        button.addEventListener('touchcancel', handleButtonRelease, { passive: true });
        
        // Add mouse support
        button.addEventListener('mousedown', handleButtonPress);
        button.addEventListener('mouseup', handleButtonRelease);
        button.addEventListener('mouseleave', handleButtonRelease);
        
        // Prevent double-tap zoom on mobile
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
}

function handleButtonPress(e) {
    const button = e.currentTarget;
    button.style.transform = 'translateY(1px) scale(0.98)';
    button.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    button.style.transition = 'all 150ms ease';
}

function handleButtonRelease(e) {
    const button = e.currentTarget;
    // Reset to hover state or normal state
    if (e.type === 'mouseleave') {
        button.style.transform = '';
    } else {
        // Keep the hover effect if mouse is still over the button
        if (button.matches(':hover')) {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        } else {
            button.style.transform = '';
            button.style.boxShadow = '';
        }
    }
    button.style.transition = 'all 300ms ease';
}

// Initialize all 4D effects
document.addEventListener('DOMContentLoaded', function() {
    init4DTilt();
    addGameEffects();
    initButtonInteractions();
});