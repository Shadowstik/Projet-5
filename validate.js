// récupération des données du formulaire envoyé
try {
    const order = JSON.parse(localStorage.getItem("order"));

    // prénom de l'utilisateur 
    const firstname = document.getElementById("firstName");
    firstname.innerHTML = order.contact.firstName;

    // identifiant de la commande
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = order.orderId;

    // prix total du panier
    const totalPrice = document.getElementById("totalPriceCart");
    totalPrice.innerHTML = JSON.parse(localStorage.getItem("priceCart")) + " €";
} catch (error) {
    console.log(error)
}