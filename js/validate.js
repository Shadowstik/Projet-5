// récupération des données du formulaire envoyé
try {
    const order = JSON.parse(localStorage.getItem("order"));
    
    // prénom de l'utilisateur 
    const firstname = document.getElementById("firstName");
    //décodage du prénom récupérer du formulaire
    const firstNameArr = Object.values(order.contact.firstName);
    const utf8decoder = new TextDecoder();
    const u8arr = new Uint8Array(firstNameArr);
    firstname.innerHTML = utf8decoder.decode(u8arr);

    // identifiant de la commande
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = order.orderId;

    // prix total du panier
    const totalPrice = document.getElementById("totalPriceCart");
    totalPrice.innerHTML = JSON.parse(localStorage.getItem("priceCart")) + " €";
} catch (error) {
    console.log(error)
}