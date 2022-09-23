'use strict';
import createModalMarkup from './templates/modal-event.hbs';
import { DiscoveryFetch } from './api.js';
import { TuiPaginationClass } from './/tui_pagination';
import pathToBarcode from '../images/modal/barcode.svg';
import createEventList from './templates/event-list.hbs';
import Notiflix from 'notiflix';
let url;
const tuiPagination = new TuiPaginationClass();

export function toggleModal() {
  const openModalEl = document.querySelector('.event-list');
  const backdropEl = document.querySelector('.backdrop');

  const closeModalBtn = document.querySelector('.modal-close-btn');
  const modalWindowEl = document.querySelector('.modal-wrap');

  const btnMoreEl = document.querySelector('.more-btn');

  const fetchModalData = new DiscoveryFetch();

  const defaultDescription = event => {
    event.map(el => {
      if (!el.description) {
        const url = `${el.url}`;
        const descr = document.querySelector('.event-info__description');
        descr.innerHTML = `Visit <a class="modal-info-link" target="_blank" href="${url}">website</a> for more information`;
      }
    });
  };

  const defaultLocation = event => {
    event.map(el => {
      if (!el._embedded) {
        const url = `${el.url}`;
        const descr = document.querySelector('.event-info__city');
        descr.innerHTML = `Visit <a class="modal-info-link" target="_blank" href="${url}">website</a> for more information`;
      }
    });
  };

  const defaultPrice = event => {
    event.map(el => {
      if (!el.priceRanges) {
        const ticketPriceList = document.querySelector('.tickets');
        ticketPriceList.innerHTML = 'No prices information';
      }
    });
  };

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
      return;
    }
    fetchModalData.id = event.target.dataset.id;

    const { data } = await fetchModalData.fetchSelectedEvent();

    const events = data._embedded.events;

    imageSizeFilter(events);
    events[0].svgUrl = pathToBarcode;
    modalWindowEl.insertAdjacentHTML('beforeend', createModalMarkup(events[0]));

    defaultDescription(events);
    defaultLocation(events);
    defaultPrice(events);
    toggleModal();

    const btnMoreEl = document.querySelector('#more');

    btnMoreEl.addEventListener('click', loadMoreByAuthor);

    document.addEventListener('keydown', onEscBtnPress);
  };

  const loadMoreByAuthor = async e => {
    fetchModalData.keyword = e.target.dataset.author;

    const { data } = await fetchModalData.fetchEvents();
    if (data.page.totalElements > 999) {
      tuiPagination.totalItems = 990;
    } else {
      tuiPagination.totalItems = data.page.totalElements;
    }
    if (data.page.totalPages > 62) {
      tuiPagination.totalPages = 62;
    } else {
      tuiPagination.totalPages = data.page.totalPages;
    }

    tuiPagination.itnitializationExem();

    if (data.page.totalPages <= 5 || data.page.totalPages === 0) {
      document.querySelector('.tui-last-child').innerHTML = '';
    }
    if (data.page.totalPages === 1) {
      document.querySelector('#pagination').innerHTML = '';
    }
    if (!data._embedded) {
      Notiflix.Notify.failure('There are no events by this artist');
      return;
    }
    toggleModal();
    const events = data._embedded.events;
    imageSizeFilter(events);
    const eventListEl = document.querySelector('.event-list');
    eventListEl.innerHTML = createEventList(events);
    Notiflix.Notify.success(
      `Hooray! We found ${data.page.totalElements} events.`
    );
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
