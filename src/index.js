import { toggleModal } from "./js/modal-opener.js";
import { footerToggleModal } from "./js/footer-modal.js";
import { DiscoveryFetch } from "./js/api.js";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import Notiflix from "notiflix";


const discoveryFetch = new DiscoveryFetch();

// discoveryFetch.keyword = "adele";


// discoveryFetch.fetchEventsByKeywords().then(response => {
//     console.log(response.data);

// }).catch(error => {
//     console.log(error)
// });

toggleModal();
footerToggleModal();


