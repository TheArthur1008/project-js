'use strict';
import { DiscoveryFetch } from './api.js';

const btnMoreEl = document.querySelector('.more-btn');

const fetchModalData = new DiscoveryFetch();
const openLinkInNewTab = async e => {
  e.preventDefault();
  fetchModalData.id = e.target.dataset.id;

  const { data } = await fetchModalData.fetchSelectedEvent();
};
btnMoreEl.addEventListener('click', openLinkInNewTab);
