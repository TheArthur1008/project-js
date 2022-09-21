'use strict'

export function footerToggleModal () {

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
    }
  })();
}