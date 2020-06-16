
// requete vers l'api

const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);

        const productOne = response[0];
        console.log(productOne);

        const productCardOne = document.querySelector("div #productOne");
        console.log(productCardOne);

        // image du produit
        const productName = productOne.name;

        const productImage = productOne.imageUrl;
        const productImageElt = document.querySelector("div #productOne > img");
        console.log(productImageElt);
        productImageElt.setAttribute("src", productImage);
        console.log(productImageElt);
        productImageElt.setAttribute("alt", "caméra" + " " + productName);

        // titre du produit
        
        const productNameElt = document.querySelector("div #productOne > div.card-body > h2");
        console.log(productNameElt);
        productNameElt.textContent = productName;
        console.log(productNameElt);

        // prix du produit

        const productPrice = productOne.price / 100;
        console.log(productPrice);
        const productPriceElt = document.querySelector("div #productOne > div.card-body > p.h4");
        console.log(productPriceElt);
        productPriceElt.textContent = productPrice + " " + "€";
        console.log(productPriceElt);

        // description du produit

        const productDescrip = productOne.description;
        const productDescripElt = document.querySelector("div #productOne > div.card-body > p.card-text");
        productDescripElt.innerHTML = productDescrip;

        // bouton de liens vers le produit

        const productId = productOne._id;
        const productButton = document.querySelector("div #productOne > div.card-footer > a");
        console.log(productButton);
        productButton.setAttribute("id", productId);
        console.log(productButton); 
    };
};

request.open("GET", "http://localhost:3000/api/cameras");
request.send();

