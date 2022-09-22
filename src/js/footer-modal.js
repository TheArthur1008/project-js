'use strict'

import { toggleModal } from "./modal-opener";

export function footerToggleModal () {
  const backdropEl = document.querySelector('.footer-backdrop');

(() => {
    const refs = {
      openModalBtn: document.querySelector(".footer-modal-open"),
      closeModalBtn: document.querySelector(".footer-modal-close-btn"),
      modal: document.querySelector(".footer-backdrop"),
    };
  
    refs.openModalBtn.addEventListener("click", footerToggleModal);
    refs.closeModalBtn.addEventListener("click", footerToggleModal);
  
    function footerToggleModal() {
      refs.modal.classList.toggle("footer-is-hidden");
    };

    const onEscBtnPress = event => {
      if (event.code === 'Escape') {
        footerToggleModal();
      }
    };

    document.addEventListener('keydown', onEscBtnPress);
    if (!refs.modal.classList.contains('footer-is-hidden')) {
      document.removeEventListener('keydown', onEscBtnPress);
    }

    backdropEl.addEventListener('click', event => {
      const { target, currentTarget } = event;
      
      if(target === currentTarget) {
        footerToggleModal();
      }
    })
    
  })();
}