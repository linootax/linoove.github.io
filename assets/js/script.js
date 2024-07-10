'use strict';

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

// display content when it is loaded
const main_content = document.getElementById('main_content')
const loading_content = document.getElementById('loading_skeleton')

addEventListener('load', () => {
  loading_content.remove()
  main_content.style.display = 'block'

})

