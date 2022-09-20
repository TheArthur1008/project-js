import axios from "axios";

export class DiscoveryFetch {
  #URL;
  #KEY;
  constructor() {
  this.#URL = 'https://app.ticketmaster.com/discovery/v2/events';
  this.#KEY = 'kLVTW7dqtxEqtJSKTwWutczpAe3AhzWs';
    this.size = 16;
    this.keyword = '';
    this.page = 1;
    this.countryCode = '';
  } 

  fetchEventsByKeywords() {
    const options = {
      apikey: this.#KEY,
      keyword: this.keyword,
      size: this.size,
      page: this.page,
    };
    return axios.get(`${this.#URL}`, { params: options });
  }

  fetchEventsByCountryCode() {
    const options = {
      apikey: this.#KEY,
      countryCode: this.countryCode,
      size: this.size,
      page: this.page,
    };
    return axios.get(`${this.#URL}`, { params: options });
  }
}