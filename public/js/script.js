document.addEventListener('DOMContentLoaded', function() {
// Configuração do áudio
const audio = document.getElementById('backgroundAudio');
if (audio) {
audio.volume = 0.4;
audio.loop = true;

const playOnInteraction = () => {
try {
audio.play()
.then(() => {
removeEventListeners();
})
.catch(error => console.error('Erro ao reproduzir:', error));
} catch (error) {
console.error('Erro:', error);
}
};

const events = ['click', 'touchstart', 'mousemove', 'keydown', 'scroll', 'drag', 'pointerdown'];
const removeEventListeners = () => {
events.forEach(event => {
document.removeEventListener(event, playOnInteraction);
});
};

events.forEach(event => {
document.addEventListener(event, playOnInteraction, { once: true });
});
}

// Efeito Ripple nos botões
function createRipple(event) {
const button = event.currentTarget;
const ripple = document.createElement('span');
const rect = button.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const x = event.clientX - rect.left - size / 2;
const y = event.clientY - rect.top - size / 2;

ripple.style.width = ripple.style.height = size + 'px';
ripple.style.left = x + 'px';
ripple.style.top = y + 'px';
ripple.classList.add('ripple');

button.appendChild(ripple);

setTimeout(() => {
ripple.remove();
}, 600);
}

// Aplicar efeito ripple em todos os botões
const buttons = document.querySelectorAll('.social-btn, .policy-btn, .nav-link');
buttons.forEach(button => {
button.addEventListener('click', createRipple);
});

// Animação de entrada dos elementos
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
});
}, observerOptions);

// Observar elementos para animação
const animatedElements = document.querySelectorAll('.profile-card, .social-btn, .nav-link');
animatedElements.forEach(el => {
el.style.opacity = '0';
el.style.transform = 'translateY(30px)';
el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
observer.observe(el);
});

// Efeito de parallax suave no scroll
let ticking = false;
function updateParallax() {
const scrolled = window.pageYOffset;
const parallaxElements = document.querySelectorAll('.floating-hearts, .floating-sparkles');

parallaxElements.forEach(element => {
const speed = 0.5;
const yPos = -(scrolled * speed);
element.style.transform = `translateY(${yPos}px)`;
});

ticking = false;
}

function requestTick() {
if (!ticking) {
requestAnimationFrame(updateParallax);
ticking = true;
}
}

window.addEventListener('scroll', requestTick);

// Efeito de hover 3D nos cards
const cards = document.querySelectorAll('.profile-card');
cards.forEach(card => {
card.addEventListener('mousemove', (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = (y - centerY) / 10;
const rotateY = (centerX - x) / 10;

card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

card.addEventListener('mouseleave', () => {
card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
});
});

// Animação de partículas interativas
function createParticle(x, y) {
const particle = document.createElement('div');
particle.className = 'particle';
particle.style.left = x + 'px';
particle.style.top = y + 'px';
document.body.appendChild(particle);

setTimeout(() => {
particle.remove();
}, 2000);
}

// Criar partículas no movimento do mouse
let mouseTimeout;
document.addEventListener('mousemove', (e) => {
clearTimeout(mouseTimeout);
mouseTimeout = setTimeout(() => {
if (Math.random() > 0.7) {
createParticle(e.clientX, e.clientY);
}
}, 100);
});

// Efeito de digitação no texto
const typingText = document.querySelector('.typing-text');
if (typingText) {
const text = typingText.textContent;
typingText.textContent = '';
let i = 0;

function typeWriter() {
if (i < text.length) {
typingText.textContent += text.charAt(i);
i++;
setTimeout(typeWriter, 100);
}
}

// Iniciar digitação após 1 segundo
setTimeout(typeWriter, 1000);
}

// Efeito de brilho nos ícones
const icons = document.querySelectorAll('.social-icon, .nav-link i');
icons.forEach(icon => {
icon.addEventListener('mouseenter', () => {
icon.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.8))';
});

icon.addEventListener('mouseleave', () => {
icon.style.filter = 'none';
});
});

// Animação de loading melhorada
const loadingScreen = document.querySelector('.loading-screen');
if (loadingScreen) {
// Simular carregamento de recursos
let progress = 0;
const progressBar = document.querySelector('.loading-progress');

const loadingInterval = setInterval(() => {
progress += Math.random() * 15;
if (progress >= 100) {
progress = 100;
clearInterval(loadingInterval);

// Remover tela de loading após completar
setTimeout(() => {
loadingScreen.classList.add('hidden');
setTimeout(() => {
loadingScreen.style.display = 'none';
}, 800);
}, 500);
}

if (progressBar) {
progressBar.style.width = progress + '%';
}
}, 200);
}

// Efeito de confete no clique
function createConfetti(x, y) {
const colors = ['#ff6b9d', '#c44569', '#ffffff', '#ffd700'];
const confettiCount = 10;

for (let i = 0; i < confettiCount; i++) {
const confetti = document.createElement('div');
confetti.style.position = 'fixed';
confetti.style.left = x + 'px';
confetti.style.top = y + 'px';
confetti.style.width = '8px';
confetti.style.height = '8px';
confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
confetti.style.borderRadius = '50%';
confetti.style.pointerEvents = 'none';
confetti.style.zIndex = '9999';

const angle = (Math.PI * 2 * i) / confettiCount;
const velocity = 100 + Math.random() * 100;
const vx = Math.cos(angle) * velocity;
const vy = Math.sin(angle) * velocity;

document.body.appendChild(confetti);

let posX = x;
let posY = y;
let opacity = 1;

function animateConfetti() {
posX += vx * 0.01;
posY += vy * 0.01 + 0.5; // gravidade
opacity -= 0.02;

confetti.style.left = posX + 'px';
confetti.style.top = posY + 'px';
confetti.style.opacity = opacity;

if (opacity > 0) {
requestAnimationFrame(animateConfetti);
} else {
confetti.remove();
}
}

requestAnimationFrame(animateConfetti);
}
}

// Aplicar confeti nos botões sociais
const socialButtons = document.querySelectorAll('.social-btn');
socialButtons.forEach(button => {
button.addEventListener('click', (e) => {
createConfetti(e.clientX, e.clientY);
});
});

// Efeito de onda sonora visual
function createAudioWave() {
const wave = document.createElement('div');
wave.style.position = 'fixed';
wave.style.bottom = '20px';
wave.style.right = '20px';
wave.style.width = '50px';
wave.style.height = '50px';
wave.style.border = '2px solid #ff6b9d';
wave.style.borderRadius = '50%';
wave.style.opacity = '0.8';
wave.style.pointerEvents = 'none';
wave.style.zIndex = '9998';
wave.style.animation = 'audio-wave 2s ease-out forwards';

document.body.appendChild(wave);

setTimeout(() => {
wave.remove();
}, 2000);
}

// Adicionar CSS para animação de onda
const style = document.createElement('style');
style.textContent = `
@keyframes audio-wave {
0% {
transform: scale(0);
opacity: 0.8;
}
100% {
transform: scale(3);
opacity: 0;
}
}
`;
document.head.appendChild(style);

// Criar onda quando o áudio tocar
if (audio) {
audio.addEventListener('play', createAudioWave);
}

// Efeito de corações flutuantes interativos
function createFloatingHeart(x, y) {
const heart = document.createElement('div');
heart.innerHTML = '💖';
heart.style.position = 'fixed';
heart.style.left = x + 'px';
heart.style.top = y + 'px';
heart.style.fontSize = '20px';
heart.style.pointerEvents = 'none';
heart.style.zIndex = '9997';
heart.style.animation = 'floating-heart-click 2s ease-out forwards';

document.body.appendChild(heart);

setTimeout(() => {
heart.remove();
}, 2000);
}

// Adicionar CSS para coração flutuante no clique
const heartStyle = document.createElement('style');
heartStyle.textContent = `
@keyframes floating-heart-click {
0% {
transform: scale(0) translateY(0);
opacity: 1;
}
50% {
transform: scale(1.5) translateY(-20px);
opacity: 1;
}
100% {
transform: scale(0) translateY(-40px);
opacity: 0;
}
}
`;
document.head.appendChild(heartStyle);

// Criar corações no clique
document.addEventListener('click', (e) => {
if (Math.random() > 0.5) {
createFloatingHeart(e.clientX, e.clientY);
}
});

// Efeito de brilho nos elementos
function addGlowEffect(element) {
element.addEventListener('mouseenter', () => {
element.style.boxShadow = '0 0 30px rgba(255, 107, 157, 0.6)';
});

element.addEventListener('mouseleave', () => {
element.style.boxShadow = '';
});
}

// Aplicar efeito de brilho
const glowElements = document.querySelectorAll('.profile-image, .logo');
glowElements.forEach(addGlowEffect);

// Cursor personalizado
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
document.addEventListener('mousemove', (e) => {
cursor.style.left = e.clientX + 'px';
cursor.style.top = e.clientY + 'px';
});

// Efeito de hover no cursor
const hoverElements = document.querySelectorAll('a, button, .nav-link, .social-btn, .policy-btn');
hoverElements.forEach(element => {
element.addEventListener('mouseenter', () => {
cursor.style.transform = 'scale(2)';
cursor.style.background = 'radial-gradient(circle, rgba(255, 107, 157, 0.8), transparent)';
});

element.addEventListener('mouseleave', () => {
cursor.style.transform = 'scale(1)';
cursor.style.background = 'radial-gradient(circle, #ff6b9d, transparent)';
});
});

// Esconder cursor padrão
document.body.style.cursor = 'none';
}

// Efeito de neve flutuante
function createSnowflake() {
const snowflake = document.createElement('div');
snowflake.className = 'snowflake';
snowflake.innerHTML = '❄';
snowflake.style.left = Math.random() * 100 + '%';
snowflake.style.animationDuration = Math.random() * 3 + 2 + 's, ' + Math.random() * 3 + 2 + 's';
snowflake.style.opacity = Math.random();
snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

document.body.appendChild(snowflake);

setTimeout(() => {
snowflake.remove();
}, 5000);
}

// Criar neve periodicamente
setInterval(createSnowflake, 300);

// Efeito de vibração nos elementos
function addVibrateEffect(element) {
element.addEventListener('click', () => {
element.classList.add('vibrate');
setTimeout(() => {
element.classList.remove('vibrate');
}, 300);
});
}

// Aplicar efeito de vibração
const vibrateElements = document.querySelectorAll('.social-btn, .nav-link');
vibrateElements.forEach(addVibrateEffect);

// Efeito de heartbeat nos corações
const hearts = document.querySelectorAll('.heart');
hearts.forEach(heart => {
heart.classList.add('heartbeat');
});

// Efeito de zoom nos elementos principais
const zoomElements = document.querySelectorAll('.profile-image, .logo');
zoomElements.forEach(element => {
element.classList.add('zoom-in');
});
}); 