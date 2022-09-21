'use strict';
export function toggleModal () {

    (() => {
        const refs = {
            openModalEl: document.querySelector('.event-list'),
            closeModalBtn: document.querySelector('.modal-close-btn'),
            modal: document.querySelector('[modal-js]'),
        };

        refs.openModalEl.addEventListener("click", toggleModal);
        refs.closeModalBtn.addEventListener("click", toggleModal);

        function toggleModal(e) {
            if (e.target === e.currentTarget) {
               return
            }
            refs.modal.classList.toggle("is-hidden");
        }
    })()
}