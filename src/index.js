import { toggleModal } from "./js/modal-opener.js";
import { DiscoveryFetch } from "./js/api.js";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import Notiflix from "notiflix";


const discoveryFetch = new DiscoveryFetch();

// discoveryFetch.keyword = "adele";
// // discoveryFetch.countryCode = "US";
// console.log(discoveryFetch.countryCode);


// discoveryFetch.fetchEvents().then(response => {
//     console.log(response.data);

// }).catch(error => {
//     console.log(error)
// });



toggleModal();

