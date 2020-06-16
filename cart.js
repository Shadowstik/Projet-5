
//function addToCart() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            const response = JSON.parse(this.responseText);

            // récupération de infos de la première vcam
            const vcam = response[0];
            const imageVcam = vcam.imageUrl;
            const idVcam = vcam._id;
            const nameVcam = vcam.name;
            const priceVcam = vcam.price /= 100;
            const descriptionVcam = vcam.description;
            const quantityVcam = 1;

            // Affichage des résultats

            // creation de la ligne panier
            let rowCart = document.createElement("tr");
            let cart = document.getElementById("cart-tablebody");
            cart.appendChild(rowCart);

            // création de la colonne produit
            let colProduct = document.createElement("td");
            colProduct.setAttribute("class", "product");
            rowCart.appendChild(colProduct);

            // création de la colonne prix
            let colPrice = document.createElement("td");
            colPrice.setAttribute("class", "price");
            rowCart.appendChild(colPrice);

            // création de la colonne quantité
            let colQuantity = document.createElement("td");
            colQuantity.setAttribute("class", "quantity");
            rowCart.appendChild(colQuantity);

            // Ajout donnée colonne produit => image
            /*let imageElt = document.createElement("img");
            imageElt.src = imageVcam;
            imageElt.setAttribute("width", "100px"); 
            colProduct.innerHTML = imageElt;
            console.log(imageElt);
            console.log(colProduct);*/

            // Ajout donnée colonne produit => name
            let nameElt = nameVcam;
            colProduct.textContent = nameElt;

            // Ajout donnée colonne prix => price
            let priceElt = priceVcam;
            colPrice.textContent = priceElt + "€";

            let quantityElt = quantityVcam;
            colQuantity.textContent = quantityElt;

            // Ajout donnée subtotal
            let subTotalElt = document.querySelector("p.subtotal span");
            const subtotal = priceVcam * quantityVcam;
            subTotalElt.textContent = subtotal;

            // retire le message du panier vide
            let removeAlert = document.querySelector("p.alert");
            removeAlert.innerHTML = "";
            removeAlert.classList.remove("alert");
        }
    };

    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
//};

//export {addToCart};


// validation formulaire

/*const firstName = document.getElementById("firstName");
firstName.addEventListener("onchange", function(e) {
    
});

const lastName = document.getElementById("lastName");
lastName.addEventListener("onchange", function(e) {

});

const email = document.getElementById("email");
email.addEventListener("onchange", function(e) {

});

const address = document.getElementById("address");
address.addEventListener("onchange", function(e) {

});

const city = document.getElementById("city");
country.addEventListener("onchange", function(e) {

});

const postalCode = document.getElementById("cp");
postalCode.addEventListener("onchange", function(e) {

});*/
