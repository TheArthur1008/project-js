const targetElForScrollBtn = document.querySelector('.custom-select');
const scrollUpBtn = document.querySelector('.scroll-up-btn');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};
const callback = function (entries, observer) {
  if (!entries[0].isIntersecting) {
    scrollUpBtn.classList.remove('is-hidden');
  }

  if (entries[0].isIntersecting) {
    scrollUpBtn.classList.add('is-hidden');
  }
};
const observer = new IntersectionObserver(callback, options);

observer.observe(targetElForScrollBtn);
