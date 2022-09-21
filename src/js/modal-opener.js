'use strict';
import createModalMarkup from './templates/modal-event.hbs';
import { DiscoveryFetch } from './api.js';
import pathToBarcode from '../images/modal/barcode.svg';

export function toggleModal () {
const openModalEl = document.querySelector('.event-list');
const backdropEl = document.querySelector('.backdrop');
  const closeModalBtn = document.querySelector('.modal-close-btn');
  const modalWindowEl = document.querySelector('.modal-wrap');
const fetchModalData = new DiscoveryFetch();

const imageSizeFilter = event => {
  event.map(el => {
    el.images.map(el => {
      if (el.width === 1024) {
        url = el.url;
      }
    });
    el.img = url;
  });
};  
  
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

  const onOpenModalBtnElClick = async event => {
    modalWindowEl.innerHTML = '';
    console.dir(event.target);
    if (event.target.nodeName === 'UL') {
      return
    }
    fetchModalData.id = event.target.dataset.id;
    console.log(fetchModalData.id);
    const { data } = await fetchModalData.fetchSelectedEvent()
    console.log(data);
    const events = data._embedded.events;
    console.log(events);
    imageSizeFilter(events);
    events[0].svgUrl = pathToBarcode;
    console.log(events[0].svgUrl);
    modalWindowEl.insertAdjacentHTML('beforeend', createModalMarkup(events[0]))
  toggleModal();

  document.addEventListener('keydown', onEscBtnPress);
};

openModalEl.addEventListener('click', onOpenModalBtnElClick);
closeModalBtn.addEventListener('click', toggleModal);

backdropEl.addEventListener('click', event => {

  const { target, currentTarget } = event;

  if (target === currentTarget) {
    toggleModal();
  }
});
}