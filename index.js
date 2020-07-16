const getProducts = async () => {
    try {
        // Récupération des données de l'api pour les caméras vintage
        let uri = "http://localhost:3000/api/cameras/";
        let response = await fetch(uri);
        if (response.ok) {
            let data = await response.json();
            const cameras = data;
            const allProducts = document.getElementById("all-products");
            cameras.forEach(vcam => {

                // création de la section des produits
                const productBox = document.createElement("section");
                productBox.setAttribute("class", "col-lg-4 col-md-6 mb-4");
                allProducts.appendChild(productBox);

                // création de la fiche produit
                const camCard = document.createElement("div");
                camCard.setAttribute("class", "card h-100");
                productBox.appendChild(camCard);

                // création de la composante d'affichage de l'image du produit
                const camImage = document.createElement("img");
                camImage.setAttribute("src", vcam.imageUrl);
                camImage.setAttribute("alt", vcam.name);
                camImage.setAttribute("class", "card-img-top");
                camCard.appendChild(camImage);

                // création du corps de la fiche produit
                const camCardBody = document.createElement("div");
                camCardBody.setAttribute("class", "card-body");
                camCard.appendChild(camCardBody);

                // création de la composante d'affichage nom du produit
                const camTitle = document.createElement("h2");
                camTitle.setAttribute("class", "card-title");
                camTitle.innerHTML = `${vcam.name}`;
                camCardBody.appendChild(camTitle);

                // création de la composante d'affichage prix du produit
                const camPrice = document.createElement("p");
                camPrice.setAttribute("class", "price h4");
                camPrice.innerHTML = `${vcam.price / 100} €`;
                camCardBody.appendChild(camPrice);

                // création de la composante d'affichage de la description du produit
                const camDescription = document.createElement("p");
                camDescription.setAttribute("class", "card-text");
                camDescription.innerHTML = `${vcam.description}`;
                camCardBody.appendChild(camDescription);

                // création du footer de la fiche produit
                const camCardFooter = document.createElement("p");
                camCardFooter.setAttribute("class", "card-footer my-0");
                camCard.appendChild(camCardFooter);

                // création de la composante de lien vers le produit
                const btnCamLink = document.createElement("a");
                btnCamLink.setAttribute("href", "product.html?id=" + `${vcam._id}`);
                btnCamLink.setAttribute("alt", "lien vers" + " " + `${vcam.name}`);
                btnCamLink.setAttribute("class", "btn btn-primary");
                btnCamLink.textContent = "Voir le produit !";
                camCardFooter.appendChild(btnCamLink);
            });

        } else {
            console.error(`Erreur ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    };
};
getProducts();

console.log(encodeURIComponent(document.location.href));



