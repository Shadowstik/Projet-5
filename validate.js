
const confirmOrder = () => {

// let response = await fetch("http://localhost:3000/api/cameras/order");
// if (response.ok) {
//     let data = await response.json();
//     console.log(data);

const firstname = document.getElementById("firstName");

const orderId = document.getElementById("orderId");
const totalPrice = document.getElementById("totalPriceCart");
totalPrice.innerHTML = JSON.parse(localStorage.getItem("priceCart")) + " €";
}
// }
confirmOrder();