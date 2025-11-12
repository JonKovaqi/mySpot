// Mobile Menu Toggle
const hamburgerBtn = document.querySelector('.login-btn');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    e.preventDefault();
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Close menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Hero Carousel
const cards = document.querySelectorAll('.apartment-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const progressFill = document.querySelector('.progress-fill');

let currentIndex = 0;
let autoSlideInterval = null;
let progressInterval = null;
let progressAnimationFrame = null;
const autoSlideDelay = 4000; // 4 sekonda per slide


function updateCarousel(newIndex, direction) {
    
    if (newIndex >= cards.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = cards.length - 1;
    }
    
    
    cards.forEach(card => {
        card.classList.remove('active', 'prev');
    });
    
    
    cards[newIndex].classList.add('active');
    
    
    currentIndex = newIndex;
    
  
    resetProgress();
}


let progressStartTime = null;

function animateProgress(timestamp) {
    if (!progressStartTime) progressStartTime = timestamp;
    const elapsed = timestamp - progressStartTime;
    const progress = Math.min((elapsed / autoSlideDelay) * 100, 100);
    
    progressFill.style.width = progress + '%';
    
    if (progress < 100) {
        progressAnimationFrame = requestAnimationFrame(animateProgress);
    }
}

function startProgress() {
    stopProgress();
    progressStartTime = null;
    progressFill.style.width = '0%';
    progressAnimationFrame = requestAnimationFrame(animateProgress);
}

function stopProgress() {
    if (progressAnimationFrame) {
        cancelAnimationFrame(progressAnimationFrame);
        progressAnimationFrame = null;
    }
    progressStartTime = null;
}

function resetProgress() {
    stopProgress();
    startProgress();
}


function nextSlide() {
    updateCarousel(currentIndex + 1, 'next');
}

function prevSlide() {
    updateCarousel(currentIndex - 1, 'prev');
}


function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Event listeners
prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    prevSlide();
    resetAutoSlide();
});

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    nextSlide();
    resetAutoSlide();
});


const carousel = document.querySelector('.hero-carousel');
carousel.addEventListener('mouseenter', (e) => {
    e.preventDefault(e);
    stopAutoSlide();
    stopProgress();
});

carousel.addEventListener('mouseleave', (e) => {
    e.preventDefault(e);
    startAutoSlide();
    startProgress();
});


startAutoSlide();
startProgress();
