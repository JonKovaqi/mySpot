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
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});


const carousel = document.querySelector('.hero-carousel');
carousel.addEventListener('mouseenter', () => {
    stopAutoSlide();
    stopProgress();
});

carousel.addEventListener('mouseleave', () => {
    startAutoSlide();
    startProgress();
});


startAutoSlide();
startProgress();
