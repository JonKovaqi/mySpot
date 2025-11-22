const toggleBtn = document.querySelector('.toggle-btn');
const storyMore = document.getElementById('story-more');
if (toggleBtn && storyMore) {
    const updateUI = (expanded) => {
        toggleBtn.setAttribute('aria-expanded', String(expanded));
        toggleBtn.textContent = expanded ? 'Read less' : 'Read more';
    };
    const toggle = () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        if (!expanded) {
            storyMore.hidden = false;
            storyMore.offsetHeight;
            storyMore.classList.add('expanded');
            updateUI(true);
        } else {
            storyMore.classList.remove('expanded');
            updateUI(false);
            setTimeout(() => { storyMore.hidden = true; }, 300);
        }
    };
    toggleBtn.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
}