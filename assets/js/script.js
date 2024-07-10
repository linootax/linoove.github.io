'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
// modalCloseOverlay.addEventListener('click', modalCloseFunc);
// modalCloseBtn.addEventListener('click', modalCloseFunc);





// notification toast variables
// const notificationToast = document.querySelector('[data-toast]');
// const toastCloseBtn = document.querySelector('[data-toast-close]');

// // notification toast eventListener
// toastCloseBtn.addEventListener('click', function () {
//   notificationToast.classList.add('closed');
// });





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

// close floating video
// const video_container = document.getElementById("floating-video");
// const close_video_icon = document.getElementById("close-video");
// const video_player = document.querySelector("video");

// close_video_icon.addEventListener("click", () => {

//   video_container.remove()
//   console.log("video closed")
// })

//delivery message
function getNextFriday() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
  let daysUntilFriday = 5 - currentDay;
  if (daysUntilFriday <= 0) {
    daysUntilFriday += 7; // Next Friday
  }
  const nextFriday = new Date(today.getTime() + (daysUntilFriday * 24 * 60 * 60 * 1000));
  return nextFriday.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
const valencia_del_date = getNextFriday()
const delivery_msg = document.getElementById("delivery-msg");

delivery_msg.innerHTML = `Delivery gratis. Mañana hay entregas en Maracay y Valencia el ${valencia_del_date}.`

//check which shipping method the user wants and display the correct form

const national_shipping_cb = document.getElementById('national_shipping')
const delivery_personal_cb = document.getElementById('delivery_personal')
const national_shipping = document.getElementById('form_national')
const delivery_personal = document.getElementById('form_delivery')

national_shipping_cb.addEventListener('change', () => {
  let isChecked = national_shipping_cb.checked

  if (isChecked) {
    delivery_personal.style.display = 'none'
    national_shipping.style.display = 'block'
  }
})
delivery_personal_cb.addEventListener('change', () => {
  let isChecked = delivery_personal_cb.checked

  if (isChecked) {
    delivery_personal.style.display = 'block'
    national_shipping.style.display = 'none'
  }

})

