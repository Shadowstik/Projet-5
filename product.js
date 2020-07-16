
const selectedProduct = async () => {
    try {
        // Récupération des données du produit selectionné via son id
        const camId = location.search.substring(4);

        const uri = "http://localhost:3000/api/cameras/" + camId;
        let response = await fetch(uri);
        if (response.ok) {
            const vcam = await response.json();

            // Affichage du nom du produit sous forme de titre
            const cardName = document.getElementById("main-title");
            cardName.innerHTML = `${vcam.name}`;

            // Affichage de l'image du produit
            const camImage = document.getElementById("img-product");
            camImage.setAttribute("src", vcam.imageUrl);
            camImage.setAttribute("alt", vcam.name);

            // Affichage du nom du produit
            const camName = document.getElementById("name");
            camName.innerHTML = `${vcam.name}`;

            // Affichage du prix du produit
            const camPrice = document.getElementById("price");
            camPrice.innerHTML = `${vcam.price / 100} €`;

            // Affichage des options de lentille du produit
            const camLenses = document.getElementById("lenses");
            vcam.lenses.forEach(lens => {
                const optionLens = document.createElement("option");
                optionLens.innerHTML = `${lens}`;
                camLenses.appendChild(optionLens);
            });

            // Affichage de la descritption du produit
            const camDescription = document.getElementById("resume");
            camDescription.innerHTML = `${vcam.description}`;


            //////////////////////  CREATION DU PANIER - LOCALSTORAGE  /////////////////////

            let userCart;

            // création du panier si il est inexistant
            if (localStorage.getItem("userCart") === null) {
                userCart = [];
            } else {
                userCart = JSON.parse(localStorage.getItem("userCart"));
            }

            // fonction d'ajout au panier
            const addToCart = () => {
                const btnAddCart = document.getElementById("add-to-cart");
                // écoute de l'évènement click sur le bouton d'ajout au panier
                btnAddCart.addEventListener("click", () => {
                    userCart.push(vcam);
                    localStorage.setItem("userCart", JSON.stringify(userCart));
                    alert("Votre produit à bien été ajouté");
                    location.reload();
                });
            };
            addToCart();

            // affiche le nombre de produit actuellement dans le panier
            const numberProductCart = document.getElementById("cart-count");
            numberProductCart.innerHTML = userCart.length;
        } else {
            alert("Ce produit n'existe plus");
        }
    } catch (error) {
        console.log(error)
    }
};
selectedProduct();















