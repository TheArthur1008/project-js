import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('pagination');

export class TuiPaginationClass {
  constructor() {
    this.totalItems = 0;
    this.itemsPerPage = 16;
    this.page = 1;
    this.paginationPageNumber = 0;
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
      document.querySelector('.tui-last').innerHTML = `<span>${Math.ceil(
        this.totalItems / this.itemsPerPage
      )}</span>`;
    }, 5);

    const myPagination = new Pagination(container, options);
    myPagination.on('beforeMove', evt => {
      this.paginationPageNumber = evt.page;

      if (
        this.paginationPageNumber <
        Math.ceil(this.totalItems / this.itemsPerPage) - 2
      ) {
        setTimeout(() => {
          document.querySelector('.tui-last').innerHTML = `<span>${Math.ceil(
            this.totalItems / this.itemsPerPage
          )}</span>`;
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
    });
  }
}
