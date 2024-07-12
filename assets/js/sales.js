'use-strict'

//delivery message
function getNextFriday() {
    const today = new Date();
    const currentDay = today.getDay();
    let daysUntilFriday = 5 - currentDay;
    if (daysUntilFriday <= 0) {
        daysUntilFriday += 7;
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

delivery_msg.innerHTML = `Mañana hay entregas en Maracay entre las 8:30 am y las 5:30 pm. En Valencia el dia ${valencia_del_date} entre las 9:00 am y 3:00 pm.`
// end delivery message

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
// 

// set 1 month to place an order
function setDatetimeLocalMinMax(inputElement) {
    // Get the current date and time
    const currentDateTime = new Date();

    // Set the minimum date to the current date and time
    const minDateTime = currentDateTime.toISOString().slice(0, 16);
    inputElement.min = minDateTime;

    // Calculate the maximum date (1 month from now)
    const maxDateTime = new Date(currentDateTime.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    inputElement.max = maxDateTime;
}

const date_input = document.getElementById("shipping_date")
setDatetimeLocalMinMax(date_input)
// 

// send order
const delivery_form = document.getElementById('order_delivery')
const shipping_form = document.getElementById('order_shipping')

function sendOrderMessage(type) {

    const order_id = crypto.randomUUID().substring(0, 12)
    let base_url = `https://api.whatsapp.com/send/?phone=584127111473&text=`
    const product = document.getElementById("product_page").value

    if (type === 'delivery') {
        let name = document.getElementById('name_delivery').value;
        let quantity = document.getElementById('quantity_delivery').value;
        let shipping_date = document.getElementById('shipping_date').value;
        let phone_number = document.getElementById('contact_delivery').value;
        let address = document.getElementById('address_delivery').value;
        let city = document.getElementById('city_delivery').value;

        function formatDateTimeLocal(dateTimeLocalString) {
            const dateTime = new Date(dateTimeLocalString);

            const weekday = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][dateTime.getDay()];
            const day = dateTime.getDate();
            const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre'][dateTime.getMonth()];

            return `${weekday}, ${day} de ${month}`;
        }

        const shipping_date_formatted = formatDateTimeLocal(shipping_date)
        const order_message = `🔵 Identificador del pedido: ${order_id}\n\n
    🏠 Dirección de entrega: ${address}, ${city}\n\n
    📆 Entrega solicitada para: ${shipping_date_formatted} a nombre de ${name}\n\n
    📞 Datos de contacto: ${phone_number}\n\n
    🔵 ${quantity} unidad(es): ${product}`
        base_url += `${order_message}&type=phone_number`

        const form_cache = {
            filled: true,
            values: {
                name: name,
                phone_number: phone_number,
                address: address,
                city: city
            }
        }



        localStorage.setItem('delivery', JSON.stringify(form_cache))

        delivery_form.href = base_url
        delivery_form.click()
        delivery_personal.reset()
    }

    if (type === 'shipping') {

        let name = document.getElementById('name_shipping').value;
        let quantity = document.getElementById('quantity_shipping').value;
        let ci = document.getElementById('ci').value;
        let phone_number = document.getElementById('contact_shipping').value;
        let address = document.getElementById('address_shipping').value;
        let city = document.getElementById('city_shipping').value;

        const form_cache = {
            filled: true,
            values: {
                name: name,
                ci: ci,
                phone_number: phone_number,
                address: address,
                city: city
            }
        }



        localStorage.setItem('shipping', JSON.stringify(form_cache))

        const order_message = `🔵 Identificador del pedido: ${order_id}\n\n
    🏠 Dirección de la oficina: ${address}, ${city}\n\n
    📆 Datos del recipiente:\n
    - Nombre: ${name}\n
    -C.I: ${ci}\n
    - Número de teléfono: ${phone_number}\n\n
    🔵 ${quantity} unidad(es): ${product}`
        base_url += `${order_message}&type=phone_number`
        shipping_form.href = base_url
        shipping_form.click()

        national_shipping.reset()
    }

    return

}

delivery_form.addEventListener('click', () => {
    sendOrderMessage('delivery')
})

shipping_form.addEventListener('click', () => {
    sendOrderMessage('shipping')
})
// 

function isCached(type) {

    const form_obj = localStorage.getItem(type);

    if (form_obj) {
        const parsed_values = JSON.parse(form_obj);
        return parsed_values.values
    }
    return null

}

const wasDeliveryFilled = isCached('delivery');
const wasShippingFilled = isCached('shipping');

const autofill_shipping = document.getElementById('autofill_shipping')
const autofill_delivery = document.getElementById('autofill_delivery')

autofill_shipping.addEventListener('click', () => {
    document.getElementById('name_shipping').value = wasShippingFilled.name;
    document.getElementById('ci').value = wasShippingFilled.ci;
    document.getElementById('contact_shipping').value = wasShippingFilled.phone_number;
    document.getElementById('address_shipping').value = wasShippingFilled.address;
    document.getElementById('city_shipping').value = wasShippingFilled.city;
})

autofill_delivery.addEventListener('click', () => {
    document.getElementById('name_delivery').value = wasDeliveryFilled.name;
    document.getElementById('contact_delivery').value = wasDeliveryFilled.phone_number;
    document.getElementById('address_delivery').value = wasDeliveryFilled.address;
    document.getElementById('city_delivery').value = wasDeliveryFilled.city;
})


if (wasShippingFilled) {
    autofill_shipping.style.display = 'block'
}
if (wasDeliveryFilled) {
    autofill_delivery.style.display = 'block'
}
