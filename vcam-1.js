/*function addCart() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var vcam = response[0];

            console.log(vcam._id);
        }
    };
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
};

class Product {
    constructor (id, name, price, description, imageUrl) {
        this.idProduct = id;
        this.nameProduct = name;
        this.priceProduct = price;
        this.descriptionProduct = description;
        this.imageUrlProduct = imageUrl;
    };
};

let vcam1 = new Product ();*/

/*var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        // récupération de infos de la première vcam
        var vcam = response[0];
        console.log(vcam);
        var imageVcam = vcam.imageUrl;
        console.log(imageVcam);
        var idVcam = vcam._id;
        console.log(idVcam);
        var nameVcam = vcam.name;
        console.log(nameVcam);
        var priceVcam = vcam.price/=100;
        console.log(priceVcam);
        var descriptionVcam = vcam.description;
        console.log(descriptionVcam);

        // Affichage des résultats
        /*var imageElt = document.createElement("img");
        imageElt.src = imageVcam;
        var rowCart = document.querySelector("#cart-tablebody tr > td");
        rowCart.appendChild(imageElt);*/
    }
};

request.open("GET", "http://localhost:3000/api/cameras");
request.send();