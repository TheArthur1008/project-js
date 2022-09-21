import axios from 'axios';

export class DiscoveryFetch {
  #URL = 'https://app.ticketmaster.com/discovery/v2/events';
  #KEY = 'kLVTW7dqtxEqtJSKTwWutczpAe3AhzWs';
  constructor() {
    this.size = 16;
    this.keyword = '';
    this.page = 0;
    this.countryCode = '';
  }

  fetchEvents() {
    const options = {
      apikey: this.#KEY,
      keyword: this.keyword,
      size: this.size,
      page: this.page,
      countryCode: this.countryCode,
    };
    return axios.get(`${this.#URL}`, { params: options });
  }

  fetchRandomEvents() {
    const options = {
      apikey: this.#KEY,
      size: this.size,
      page: this.page,
      sort: 'random',
    };
    return axios.get(`${this.#URL}`, { params: options });
  }
}
