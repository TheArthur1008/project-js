import './js/header';
import { toggleModal } from "./js/modal-opener.js";
import { DiscoveryFetch } from "./js/api.js";
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import Notiflix from "notiflix";


const discoveryFetch = new DiscoveryFetch;

toggleModal();

