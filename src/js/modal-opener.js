'use strict';
export function toggleModal () {
const openModalEl = document.querySelector('.event-list');
const backdropEl = document.querySelector('.backdrop');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const btnBuyStd = document.querySelector('.btn-std');
    const btnBuyVip = document.querySelector('.btn-vip');
    const btnMoreEl = document.querySelector('.more-btn');

const toggleModal = () => {
  backdropEl.classList.toggle('is-open');

  if (!backdropEl.classList.contains('is-open')) {
    document.removeEventListener('keydown', onEscBtnPress);
  }
};

const onEscBtnPress = event => {
  if (event.code === 'Escape') {
    toggleModal();
  }
};

const onOpenModalBtnElClick = event => {
  toggleModal();

  document.addEventListener('keydown', onEscBtnPress);
};

openModalEl.addEventListener('click', onOpenModalBtnElClick);
closeModalBtn.addEventListener('click', toggleModal);

backdropEl.addEventListener('click', event => {
  // console.log('event.target: ', event.target);
  // console.log('event.currentTarget: ', event.currentTarget);

  const { target, currentTarget } = event;

  if (target === currentTarget) {
    toggleModal();
  }
});
}