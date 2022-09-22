////////Приймає відповідь з апішки в першому then
export function tuiPagination(response) {
  const { size, totalElements, totalPages, number } = response.data.page;
  console.log(size);
  console.log(totalElements);
  console.log(totalPages);
  console.log(number);

  const options = {
    totalItems: totalElements,
    itemsPerPage: size,
    visiblePages: 5,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const container = document.getElementById('pagination');
  const myPagination = new Pagination(container, options);

  /////Метод повертає сторінку myPagination.on('beforeMove' на яку перейшов користувач:
  myPagination.on('beforeMove', evt => {
    const { page } = evt;
    console.log(evt);

    ///////логіка скривання першої стрілки
    if (page > 1) {
      setTimeout(() => {
        document.querySelector('.tui-first').classList.add('visually-hidden');
        document.querySelector('.tui-first').innerHTML = '<span>|&#8656</span>';
      }, 1);
    }

    //////Логіка скривання  перших двох стрілок
    if (page >= 6) {
      setTimeout(() => {
        document
          .querySelector('.tui-first')
          .classList.remove('visually-hidden');
        document.querySelector('.tui-prev-is-ellip').innerHTML =
          '<span>&#8656</span>';
      }, 2);
      ///логіка послідньої цифри пропадання і з'являння
      //   if (Math.trunc(totalPages / 5) === Math.trunc(page / 5)) {
      //     document.querySelector('.tui-last').classList.add('visually-hidden');
      //   } else {
      //     console.log('casa');
      //     document.querySelector('.tui-last').classList.remove('visually-hidden');
      //   }
    }

    // ////////////////////Логіка виклику запитів

    // discoveryFetch.page = page;
    // discoveryFetch.fetchEvents();
  });
  // ///// Стрілка вперед:
  document.querySelector('.tui-last-child').innerHTML = '<span>&#8658</span>';

  ///// вказівник послідньої сторінки
  document.querySelector('.tui-last').innerHTML = `<span>${totalPages}</span>`;
}
