
// Récupération des données de l'api pour les lentilles de caméra vintage

const getProduct = async () => {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/");
        if (response.ok) {
            let data = await response.json();
            console.log(data);

            const products = document.getElementById("all-products");
            console.log(products);
            const lenses = data;
            lenses.forEach(lens => {
                products.innerHTML +=
                    `<div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                            <img src="${lens.imageUrl}" alt="${lens.name}" class="card-img-top">
                            <div class="card-body">
                                <h2 class="card-title">${lens.name}</h2>
                                <p class="price h4">${lens.price / 100}€</p>
                                <p class="card-text">${lens.description}</p>
                            </div>
                            <div class="card-footer">
                                <a href="product.html?id=${lens._id}" class="btn btn-primary">Voir le produit !</a>
                            </div>
                        </div>
                    </div>`;

                console.log(products);
                // création de la structure de la fiche produit

                /*const cardBox = document.createElement("div");
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
                cardFooter.appendChild(productLink);*/
            })
        } else {
            console.error(`Erreur ${response.status}`);
        }

    } catch (e) {
        console.log(e);
    };
};

getProduct();