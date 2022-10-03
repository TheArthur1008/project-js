import './js/header';
import './js/scroll-up-btn';
import { toggleModal } from './js/modal-opener.js';
import { DiscoveryFetch } from './js/api.js';
import { footerToggleModal } from './js/footer-modal.js';
import Notiflix from 'notiflix';
import createEventList from './js/templates/event-list.hbs';
import { TuiPaginationClass } from './js/tui_pagination';

const discoveryFetch = new DiscoveryFetch();
const tuiPagination = new TuiPaginationClass();

const eventList = document.querySelector('.event-list');
const submitFormEl = document.querySelector('.js-form');
const container = document.getElementById('pagination');
window.onload = function () {
  document.body.className += 'loaded';
};
let url;

toggleModal();
footerToggleModal();

const defaulValues = events => {
  events.map(el => {
    if (!el._embedded || !el._embedded.venues[0].name || !el._embedded.venues) {
      el._embedded = {
        venues: [
          {
            name: 'No location information',
          },
        ],
      };
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

const randomEvents = async () => {
  try {
    const { data } = await discoveryFetch.fetchRandomEvents();

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
    const events = data._embedded.events;
    defaulValues(events);
    imageSizeFilter(events);
    eventList.insertAdjacentHTML('beforeend', createEventList(events));
  } catch (error) {}
};

randomEvents();

const onSearchIventsSubmit = async event => {
  event.preventDefault();
  discoveryFetch.page = 0;
  eventList.innerHTML = '';

  discoveryFetch.keyword = event.currentTarget.elements.search.value;
  discoveryFetch.countryCode =
    event.currentTarget.elements.countrySelector.value;

  try {
    if (discoveryFetch.keyword === '' && discoveryFetch.countryCode === '') {
      container.innerHTML = '';
      return;
    }

    if (discoveryFetch.keyword !== '' || discoveryFetch.countryCode !== '') {
      const { data } = await discoveryFetch.fetchEvents();

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

      if (data.page.totalPages <= 5) {
        document.querySelector('.tui-last-child').innerHTML = '';
      }
      if (data.page.totalPages === 1) {
        document.querySelector('#pagination').innerHTML = '';
      }

      const events = data._embedded.events;
      defaulValues(events);
      imageSizeFilter(events);

      if (data.page.totalElements === null && data.page.totalPages === null) {
        document.querySelector('#pagination').innerHTML = '';
        Notiflix.Notify.failure(
          'Sorry, there are no events matching your search query. Please try again.'
        );
        return;
      }
      if (data.page.totalElements === 1) {
        eventList.insertAdjacentHTML('beforeend', createEventList(events));
        return;
      }
      eventList.insertAdjacentHTML('beforeend', createEventList(events));
      Notiflix.Notify.success(
        `Hooray! We found ${data.page.totalElements} events.`
      );
    }
  } catch (error) {
    document.querySelector('#pagination').innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no events matching your search query. Please try again.'
    );
  }
};

submitFormEl.addEventListener('submit', onSearchIventsSubmit);
