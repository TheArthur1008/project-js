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
const paginationElement = document.querySelector('.tui-pagination');

let url;

toggleModal();
footerToggleModal();

const defaulValues = events => {
  events.map(el => {
    if (!el._embedded || !el._embedded.venues[0].name) {
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
    console.log(data);
    if (data.page.totalElements > 999) {
      tuiPagination.totalItems = 990;
    } else {
      tuiPagination.totalItems = data.page.totalElements;
    }

    tuiPagination.itnitializationExem();
    const events = data._embedded.events;
    imageSizeFilter(events);
    eventList.insertAdjacentHTML('beforeend', createEventList(events));
  } catch (error) {
    console.log(error);
  }
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
    if (discoveryFetch.keyword !== '') {
      const { data } = await discoveryFetch.fetchEvents();

      tuiPagination.totalItems = data.page.totalElements;
      tuiPagination.itnitializationExem();

      const events = data._embedded.events;
      defaulValues(events);
      imageSizeFilter(events);

      if (data.page.totalElements === null) {
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
    Notiflix.Notify.failure(
      'Sorry, there are no events matching your search query. Please try again.'
    );
  }
};

const onLoadMoreRandom = async event => {
  const currentNumber = Number(event.target.textContent) - 1;
  if (event.target.textContent === '...') {
    return;
  }

  if (discoveryFetch.keyword !== '') {
    discoveryFetch.page = currentNumber;
    const { data } = await discoveryFetch.fetchEvents();
    console.log(data);
    const events = data._embedded.events;
    imageSizeFilter(events);
    eventList.innerHTML = createEventList(events);
    return;
  }

  discoveryFetch.page = currentNumber;
  const { data } = await discoveryFetch.fetchRandomEvents();
  const events = data._embedded.events;
  imageSizeFilter(events);
  eventList.innerHTML = createEventList(events);
};

paginationElement.addEventListener('click', onLoadMoreRandom);
submitFormEl.addEventListener('submit', onSearchIventsSubmit);
