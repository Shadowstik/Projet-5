var request = new XMLHttpRequest();
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

        // creation de la ligne panier
        var rowCart = document.createElement("tr");
        
        var colProduct = document.createElement("td");
        colProduct.setAttribute("class", "product");
        rowCart.appendChild(colProduct);

        var colPrice = document.createElement("td");
        colPrice.setAttribute("class", "price");
        rowCart.appendChild(colPrice);

        var colQuantity = document.createElement("td");
        colQuantity .setAttribute("class", "quantity");
        rowCart.appendChild(colQuantity);

        console.log(rowCart);

        var imageElt = document.createElement("img");
        imageElt.src = imageVcam;
        imageElt.setAttribute("width", "100px");
        var rowCart1 = document.getElementsByClassName("product");
        rowCart1.appendChild(imageElt);

        var nameElt = document.createElement("span");
        nameElt.innerHTML = nameVcam;
        var rowCart2 = document.querySelector("#cart-tablebody tr > td.product");
        rowCart2.appendChild(nameElt);

        var priceElt = document.createElement("span");
        priceElt.innerHTML = priceVcam;
        var rowCart3 = document.querySelector("#cart-tablebody tr > td.price");
        rowCart3.appendChild(priceElt);

        // retire le message du panier vide
        var removeAlert = document.querySelector("p.alert");
        console.log(removeAlert);
        removeAlert.innerHTML = "";
        removeAlert.classList.remove("alert");
    }
};

request.open("GET", "http://localhost:3000/api/cameras");
request.send();