
const productAdded = async () => {
    //     let response = await fetch("http://localhost:3000/api/cameras/");
    //     if (response.ok) {
    //         let data = await response.json();

    // récupération des données du panier (localStorage)
    let currentCart = JSON.parse(localStorage.getItem("userCart"));
    console.log(currentCart);

    // création du panier lorsqu'un produit a été ajouté
    if (currentCart.length > 0 || currentCart.length !== null) {

        // affiche le nombre de produit actuellement dans le panier
        const numberProductCart = document.getElementById("cart-count");
        numberProductCart.innerHTML = currentCart.length;

        // masquage du message d'alerte indiquant que le panier est vide
        const alertEmpty = document.querySelector("p.alert");
        alertEmpty.classList.add("invisible");

        const cartPlace = document.getElementById("cart");
        console.log(cartPlace);

        // création de la structure du panier sous forme de tableau 
        const tableCart = document.createElement("table");
        tableCart.setAttribute("class", "table text-secondary text-center");
        cartPlace.appendChild(tableCart);

        // création des entêtes du tableau 
        const tableHeadings = document.createElement("thead");
        tableHeadings.setAttribute("class", "thead-light");
        tableCart.appendChild(tableHeadings);

        const rowHeadings = document.createElement("tr");
        rowHeadings.setAttribute("class", "text-left h5");
        tableHeadings.appendChild(rowHeadings);

        // Affichage des différentes entêtes du tableau
        const camName = document.createElement("th");
        camName.textContent = "Article";
        rowHeadings.appendChild(camName);

        const camPrice = document.createElement("th");
        camPrice.textContent = "Prix";
        rowHeadings.appendChild(camPrice);

        const camQuantity = document.createElement("th");
        camQuantity.textContent = "Quantité";
        rowHeadings.appendChild(camQuantity);

        const camSubTotal = document.createElement("th");
        camSubTotal.textContent = "Sous-total";
        rowHeadings.appendChild(camSubTotal);

        // création du body du tableau
        const tableBody = document.createElement("tbody");
        tableBody.setAttribute("id", "cart-tablebody");
        tableCart.appendChild(tableBody);

        // création du footer du tableau
        const cartFooter = document.createElement("div");
        cartFooter.setAttribute("class", "row my-4");
        tableCart.appendChild(cartFooter);

        // création de la section "total" du panier
        const totalCart = document.createElement("p");
        totalCart.setAttribute("class", "col-6 h6 align-middle my-0");
        totalCart.textContent = "TOTAL À PAYER: ";
        cartFooter.appendChild(totalCart);

        const totalCartValue = document.createElement("span");
        totalCartValue.setAttribute("id", "total-cart");
        totalCart.appendChild(totalCartValue);

        // liste des id des produit présent dans le panier
        const arrayIdCart = [];
        let k = 0;
        currentCart.forEach((idCart) => {
            arrayIdCart[k] = idCart._id;
            k++;
        });
        console.log(arrayIdCart);

        //nombre d'occurence par id de produit
        const occurrences = arrayIdCart.reduce((obj, item) => {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {});

        console.log(occurrences);
        // console.log(occurrences[]);

        // // création de la ligne du produit du panier pour chaque produit
        // currentCart.forEach((product) => {

        //pour chaque occurence différente d'un produit du panier création d'une ligne produit
        let i = 0;

        for (let [key, quantity] of Object.entries(occurrences)) {

            const response = await fetch("http://localhost:3000/api/cameras/" + key);
            const data = await response.json();
            const product = data;
            console.log(response);
            i++;

            // création de la ligne du produit ajouté au panier
            const rowProduct = document.createElement("tr");
            rowProduct.setAttribute("class", "text-left h6");
            rowProduct.setAttribute("id", product._id);
            tableBody.appendChild(rowProduct);
            console.log(rowProduct);

            
            const productTitle = document.createElement("td");
            productTitle.setAttribute("class", "align-middle");
            rowProduct.appendChild(productTitle);

            // image du produit
            const productImage = document.createElement("img");
            productImage.setAttribute("src", product.imageUrl);
            productImage.setAttribute("alt", "name");
            productImage.setAttribute("width", "100");
            productTitle.appendChild(productImage);

            // nom du produit
            const productName = document.createElement("a");
            productName.setAttribute("class", "align-middle pl-3");
            productName.setAttribute("href", "product.html?id=" + `${product._id}`);
            productName.setAttribute("alt", "lien vers" + " " + `${product.name}`);
            productName.innerHTML = product.name;
            productTitle.appendChild(productName);

            // prix du produit
            const productPrice = document.createElement("td");
            productPrice.setAttribute("class", "align-middle");
            productPrice.innerHTML = product.price / 100 + "€";
            rowProduct.appendChild(productPrice);

            // quantité du produit
            const productQuantity = document.createElement("td");
            productQuantity.setAttribute("class", "align-middle");
            productQuantity.innerHTML = quantity;
            rowProduct.appendChild(productQuantity);

            // sous-total / prix du produit selon la quantité
            const subTotalPrice = document.createElement("td");
            subTotalPrice.setAttribute("class", "align-middle");
            subTotalPrice.innerHTML = quantity * product.price / 100 + "€";
            rowProduct.appendChild(subTotalPrice);

            // bouton permettant de supprimer 1 unité du produit
            const cellBtnRemove = document.createElement("td");
            cellBtnRemove.setAttribute("class", "align-middle border-0");
            rowProduct.appendChild(cellBtnRemove);

            const btnRemoveProduct = document.createElement("button");
            btnRemoveProduct.setAttribute("type", "button");
            btnRemoveProduct.setAttribute("id", "btn-remove" + i);
            btnRemoveProduct.setAttribute("class", "btn btn-secondary");
            btnRemoveProduct.innerHTML = "X";
            cellBtnRemove.appendChild(btnRemoveProduct);
            console.log(btnRemoveProduct);

            //récupération de l'évènement pour supprimer un article
            document.getElementById("btn-remove" + i).onclick = () => {
                currentCart.forEach((idProduct) => {
                    arrayIdCart[k] = idProduct._id;
                    k++;
                });
                const indexId = arrayIdCart.indexOf(key);
                console.log(indexId);
                removeCam(indexId);
            };

        };

        // affichage du prix total des articles dans le panier
        let totalPrice = 0;
        currentCart.forEach(product => {
            totalPrice += parseInt(product.price / 100);
        });

        const total = document.getElementById("total-cart");
        total.innerHTML = totalPrice + "€";

        // création du bouton de suppression du panier
        const btnEmptyCart = document.createElement("button");
        btnEmptyCart.setAttribute("class", "col-6 btn btn-primary");
        btnEmptyCart.textContent = "Vider le panier !";
        btnEmptyCart.addEventListener("click", () => {
            localStorage.clear();
            location.reload();
        });
        cartFooter.appendChild(btnEmptyCart);

        // fonction pour retirer un produit du panier
        const removeCam = (i) => {
            //recupérer le tableau dans localStorage
            currentCart.splice(i, 1);
            //mettre à jour le localStorage avec le nouveau panier
            localStorage.setItem("userCart", JSON.stringify(currentCart));
            location.reload();
        };



        /////////////////////// FORMULAIRE DE VALIDATION ////////////////////////////////////

        // vérification des inputs du formulaire via les REGEX

        const inputChecking = () => {
            const stringCheck = /[a-zA-Z]/;
            const numberCheck = /[0-9]/;
            //emailregex.com
            const mailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const specialCharactersCheck = /[§!@#$%^&*().?":{}|<>]/;
        };

        // fin de la vérification 
        const messageCheck = " ";

        const products = [];
        const url = "http://localhost:3000/api/cameras/order";

        const confirmOrder = () => {
            const submitOrder = document.getElementById("validate-cart");
            submitOrder.addEventListener("submit", (e) => {
                e.preventDefault();
                if (currentCart.length !== null) {
                    console.log("Envoyer la commande");

                    // si le panier contient des articles le tableau "products" peut être complété
                    currentCart.forEach((product) => {
                        products.push();
                    });
                }
            });

            // récupération des input du formulaire
            const form = document.forms["form"];

            // initialisation de l'objet contact pour envoie à l'API
            const contact = {}; //{prénom, nom, adresse, ville, adresse-électronique};

            form["firstName"].addEventListener("change", () => {
                contact.firstName = this.value;
            });
            form["lastName"].addEventListener("input", () => {
                contact.lastName = this.value;
            });
            form["address"].addEventListener("change", () => {
                contact.address = this.value;
            });
            form["city"].addEventListener("change", () => {
                contact.city = this.value;
            });
            form["email"].addEventListener("change", () => {
                contact.email = this.value;
            });

            // Validation donné saisi
            // const btnValidate = document.getElementById("validate-cart");
            // const inputs = formulaire;
            // const erreurmessage;
            // const erreurmessageMail;
            // const erreurText = document.getElementById("erreur");

            // //récupération des inputs
            // const firstName = document.getElementById("firstName").value;
            // const lastName = document.getElementById("lastName").value;
            // const email = document.getElementById("email").value;
            // const address = document.getElementById("address").value;
            // const city = document.getElementById("city").value;
            // const postalCode = document.getElementById("cp").value;
        };
    } else {
        console.log("panier vide");
    }
};
productAdded();



