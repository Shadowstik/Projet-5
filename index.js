

// requête des données de l'api

const request = new XMLHttpRequest();
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);

        const products = document.getElementById("all-products");
        console.log(products);

        for (let i = 0; i < response.length; i++) {

            const idProduct = response[i]._id;
            const nameProduct = response[i].name;
            const imageProduct = response[i].imageUrl;
            const resumeProduct = response[i].description;
            const priceProduct = response[i].price / 100;


            // création de la structure de la fiche produit

            const cardBox = document.createElement("div");
            cardBox.setAttribute("class", "col-lg-4 col-md-6 mb-4");
            products.appendChild(cardBox);
            console.log(products);

            const cardContent = document.createElement("div");
            cardContent.setAttribute("class", "card h-100");
            cardBox.appendChild(cardContent);
            console.log(cardBox);

            // création de l'image

            const cardImage = document.createElement("img");
            cardImage.setAttribute("class", "card-img-top");
            cardImage.setAttribute("src", imageProduct);
            cardImage.setAttribute("alt", nameProduct);
            cardContent.appendChild(cardImage);
            console.log(cardImage);

            const cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            cardBody.nextElementSibling;
            cardContent.appendChild(cardBody);

            // création du titre

            const cardTitle = document.createElement("h2");
            cardTitle.setAttribute("class", "card-title h4");
            cardTitle.innerHTML = nameProduct;
            cardBody.appendChild(cardTitle);

            // création du prix

            const cardPrice = document.createElement("p");
            cardPrice.setAttribute("class", "price h4");
            cardPrice.innerHTML = priceProduct + " " + "€";
            cardBody.appendChild(cardPrice);

            // création de la description

            const cardText = document.createElement("p");
            cardText.setAttribute("class", "card-text");
            cardText.innerHTML = resumeProduct;
            cardBody.appendChild(cardText);

            // création du bouton

            const cardFooter = document.createElement("div");
            cardFooter.setAttribute("class", "card-footer");
            cardContent.appendChild(cardFooter);

            const productLink = document.createElement("a");
            productLink.setAttribute("href", "product.html?id=" + idProduct);
            console.log(productLink);
            productLink.setAttribute("class", "btn btn-primary");
            productLink.textContent = "Voir le produit !";
            cardFooter.appendChild(productLink);
        };
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();




