'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModals = document.querySelectorAll('.show-modal');

const openModal = function () {
  console.log('button clicked');
  console.log(modal)
  modal.classList.remove('hidden');
  modal.style.display = 'block'
  overlay.classList.remove('hidden');
  overlay.style.diddsplay = 'block'
};

//function to close modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//selecting modals
for (let i = 0; i < btnsShowModals.length; i++)
  btnsShowModals[i].addEventListener('click', openModal);

//btnCloseModal.addEventListener('click', closeModal);
//overlay.addEventListener('click', closeModal);

//close modal through escape
document.addEventListener('keydown', function (e) {
  //console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    // if (!modal.classList.contains('hidden')) {
    closeModal();
    //}
  }
});
