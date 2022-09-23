'use strict';
import { DiscoveryFetch } from './api.js';

const btnMoreEl = document.querySelector('.more-btn');

const fetchModalData = new DiscoveryFetch();
const openLinkInNewTab = async (e) => {
    e.preventDefault();
    fetchModalData.id = e.target.dataset.id;
    console.log(fetchModalData.id);
    const { data } = await fetchModalData.fetchSelectedEvent()
    console.log(data.url);
    console.dir(e.target);
    console.log(fetchModalData);
    
}
btnMoreEl.addEventListener('click', openLinkInNewTab)
// function onBtnBuyTicketsStd(e) {

//     window.open(, '_blank');
// }

// btnStdEl.addEventListener('click', onBtnBuyTicketsStd);
// btnVipEl.addEventListener('click', onBtnBuyTicketsVip);
// btnMoreEl.addEventListener('click', onBtnShowMore)
// console.dir(fetchModalData);



// const onSearchIventsSubmit = async event => {
//   event.preventDefault();
//   discoveryFetch.page = 0;
//   eventList.innerHTML = '';

//   discoveryFetch.keyword = event.currentTarget.elements.search.value;
//   discoveryFetch.countryCode =
//     event.currentTarget.elements.countrySelector.value;
//   console.dir(discoveryFetch.countryCode);
//   try {
//     if (discoveryFetch.keyword !== '') {
//       const { data } = await discoveryFetch.fetchEvents();
//       console.log(data);

//       const events = data._embedded.events;

//       imageSizeFilter(events);

//       if (data.page.totalElements === null) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no events matching your search query. Please try again.'
//         );
//         return;
//       }
//       if (data.page.totalElements === 1) {
//         eventList.insertAdjacentHTML('beforeend', createEventList(events));
//         return;
//       }
//       eventList.insertAdjacentHTML('beforeend', createEventList(events));
//       Notiflix.Notify.success(
//         `Hooray! We found ${data.page.totalElements} events.`
//       );
//       // gallery.refresh();
//     }
//   } catch (error) {
//     Notiflix.Notify.failure(
//       'Sorry, there are no events matching your search query. Please try again.'
//     );
//   }
// };

// submitFormEl.addEventListener('submit', onSearchIventsSubmit);
