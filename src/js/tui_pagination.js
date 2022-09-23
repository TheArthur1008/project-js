'use strict';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { DiscoveryFetch } from './api.js';
import createEventList from './templates/event-list.hbs';
import Notiflix from 'notiflix';

let url;

const container = document.getElementById('pagination');
const eventList = document.querySelector('.event-list');
const submitFormEl = document.querySelector('.js-form');

const discoveryFetch = new DiscoveryFetch();
const smoothScroll = () => {
  try {
    const { top: cardHeight } = document
      .querySelector('.event-list')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {}
};

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

export class TuiPaginationClass {
  constructor() {
    this.totalItems = 0;
    this.itemsPerPage = 16;
    this.page = 1;
    this.paginationPageNumber = 0;
    this.totalPages = 0;
  }
  itnitializationExem() {
    const options = {
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
      visiblePages: 5,
      page: this.page,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
    };
    setTimeout(() => {
      try {
        document.querySelector(
          '.tui-last'
        ).innerHTML = `<span>${this.totalPages}</span>`;
      } catch (error) {}
    }, 5);
    const myPagination = new Pagination(container, options);

    myPagination.on('beforeMove', async evt => {
      this.paginationPageNumber = evt.page;
      discoveryFetch.page = this.paginationPageNumber - 1;
      discoveryFetch.keyword = submitFormEl.elements.search.value;
      discoveryFetch.countryCode = submitFormEl.elements.countrySelector.value;

      smoothScroll();
      try {
        if (discoveryFetch.keyword !== '') {
          discoveryFetch.page = this.paginationPageNumber - 1;
          const { data } = await discoveryFetch.fetchEvents();

          if (discoveryFetch.page < this.totalPages - 3) {
            setTimeout(() => {
              document.querySelector(
                '.tui-last'
              ).innerHTML = `<span>${this.totalPages}</span>`;
            }, 5);
          } else {
            document.querySelector('.tui-last').innerHTML = '';
          }

          if (evt.page > 3) {
            setTimeout(() => {
              document.querySelector('.tui-first').innerHTML = '<span>1</span>';
            }, 5);
          } else {
            document.querySelector('.tui-first').innerHTML = '';
          }
          const events = data._embedded.events;
          defaulValues(events);
          imageSizeFilter(events);
          eventList.innerHTML = createEventList(events);
          return;
        }
        const { data } = await discoveryFetch.fetchRandomEvents();
        const events = data._embedded.events;
        defaulValues(events);
        imageSizeFilter(events);
        eventList.innerHTML = createEventList(events);

        if (discoveryFetch.page < this.totalPages - 3) {
          setTimeout(() => {
            document.querySelector(
              '.tui-last'
            ).innerHTML = `<span>${this.totalPages}</span>`;
          }, 5);
        } else {
          document.querySelector('.tui-last').innerHTML = '';
        }

        if (evt.page > 3) {
          setTimeout(() => {
            document.querySelector('.tui-first').innerHTML = '<span>1</span>';
          }, 5);
        } else {
          document.querySelector('.tui-first').innerHTML = '';
        }
      } catch (error) {
        Notiflix.Notify.failure(
          'Sorry, there are no events matching your search query. Please try again.'
        );
      }
    });
  }
}
