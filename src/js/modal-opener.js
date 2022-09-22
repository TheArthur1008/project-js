'use strict';
import createModalMarkup from './templates/modal-event.hbs';
import { DiscoveryFetch } from './api.js';
import pathToBarcode from '../images/modal/barcode.svg';
import createEventList from './templates/event-list.hbs'
import Notiflix from 'notiflix';

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

    if (event.target.nodeName === 'UL') {
      return
    }
    fetchModalData.id = event.target.dataset.id;

    const { data } = await fetchModalData.fetchSelectedEvent()

    const events = data._embedded.events;

    imageSizeFilter(events);
    events[0].svgUrl = pathToBarcode;
    modalWindowEl.insertAdjacentHTML('beforeend', createModalMarkup(events[0]))

    toggleModal();
    const btnMoreEl = document.querySelector('#more');

    btnMoreEl.addEventListener('click', loadMoreByAuthor);

  document.addEventListener('keydown', onEscBtnPress);
};

  const loadMoreByAuthor = async e => {
    
    fetchModalData.keyword = e.target.dataset.author;

    const { data } = await fetchModalData.fetchEvents();
    if (!data._embedded) {
      Notiflix.Notify.failure('There are no events by this artist');
      return
    }
    toggleModal();
    const events = data._embedded.events;
    imageSizeFilter(events);
    const eventListEl = document.querySelector('.event-list');
    eventListEl.innerHTML = createEventList(events);

  }

  
  
openModalEl.addEventListener('click', onOpenModalBtnElClick);
closeModalBtn.addEventListener('click', toggleModal);

backdropEl.addEventListener('click', event => {

  const { target, currentTarget } = event;

  if (target === currentTarget) {
    toggleModal();
  }
});
}