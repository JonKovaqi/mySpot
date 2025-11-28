const toggleBtn = document.querySelector(".toggle-btn");
const storyMore = document.getElementById("story-more");
if (toggleBtn && storyMore) {
  const updateUI = (expanded) => {
    toggleBtn.setAttribute("aria-expanded", String(expanded));
    toggleBtn.textContent = expanded ? "Read less" : "Read more";
  };
  const toggle = () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (!expanded) {
      storyMore.hidden = false;
      storyMore.offsetHeight;
      storyMore.classList.add("expanded");
      updateUI(true);
    } else {
      storyMore.classList.remove("expanded");
      updateUI(false);
      setTimeout(() => {
        storyMore.hidden = true;
      }, 300);
    }
  };
  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });
}
const faqItems = document.querySelectorAll(".faq-item");
if (faqItems.length) {
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!button || !answer) return;

    const setExpanded = (el, expanded) =>
      el.setAttribute("aria-expanded", String(expanded));
    const expand = () => {
      item.classList.add("open");
      answer.hidden = false;
      answer.offsetHeight;
      setExpanded(button, true);
    };
    const collapse = () => {
      item.classList.remove("open");
      setExpanded(button, false);
      setTimeout(() => {
        answer.hidden = true;
      }, 280);
    };
    const toggle = () => {
      const isOpen = item.classList.contains("open");
      //mshel tani e qel tjetren veq nja len me u kan qelun
      faqItems.forEach((other) => {
        if (other !== item && other.classList.contains("open")) {
          const ob = other.querySelector(".faq-question");
          const oa = other.querySelector(".faq-answer");
          if (ob && oa) {
            ob.setAttribute("aria-expanded", "false");
            other.classList.remove("open");
            setTimeout(() => {
              oa.hidden = true;
            }, 280);
          }
        }
      });
      isOpen ? collapse() : expand();
    };

    button.addEventListener("click", (e) => {
      e.preventDefault();
      toggle();
    });
  });
}
const timelineItems = document.querySelectorAll(".timeline-item");
if (timelineItems.length && "IntersectionObserver" in window) {
  const activeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    { root: null, threshold: 0.6 }
  );
  timelineItems.forEach((item) => activeObserver.observe(item));
}
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && !prefersReduced && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}
