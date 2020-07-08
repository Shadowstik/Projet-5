
const productAdded = async () => {

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

            //récupération de l'élément bouton pour supprimer un article
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

        // Initialisation des ressources pour l'envoie à l'API
        const products = [];
        let contact = {};

        // Récupération des input du formulaire
        const form = document.getElementById("validForm");

        // vérification des inputs du formulaire via les REGEX
        const validNumber = /[0-9]/;
        const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validCharacter = /[§!@#$%^&*().?":{}|<>]/;

        //récupération des inputs
        let firstNameForm = document.getElementById("firstName");
        const lastNameForm = document.getElementById("lastName");
        const emailForm = document.getElementById("email");
        const addressForm = document.getElementById("address");
        const cityForm = document.getElementById("city");

        //Vérification des champs de saisi du formulaire

        //Test prénom
        // const validFirstName = () => {
            firstNameForm.addEventListener("change", () => {
                if (firstNameForm.value == "" || validCharacter.test(firstNameForm.value) == true || validNumber.test(firstNameForm.value) == true) {
                    console.log("ça marche pas");
                    const feedbackFName = document.getElementById("feedback-firstname");
                    feedbackFName.innerHTML = "Un prénom valide est obligatoire";
                    feedbackFName.classList.remove("text-success");
                    feedbackFName.classList.add("text-danger");
                    return false;
                } else {
                    console.log("ça marche");
                    const feedbackFName = document.getElementById("feedback-firstname");
                    feedbackFName.innerHTML = "le prénom est valide";
                    feedbackFName.classList.remove("text-danger");
                    feedbackFName.classList.add("text-success");
                    return true;
                }
            });
        // };
        // validFirstName();

        //Test nom
        // const validLastName = () => {
            lastNameForm.addEventListener("change", () => {
                if (lastNameForm.value == "" || validCharacter.test(lastNameForm.value) == true || validNumber.test(lastNameForm.value) == true) {
                    console.log("ça marche pas");
                    const feedbackLName = document.getElementById("feedback-lastname");
                    feedbackLName.innerHTML = "Un nom valide est obligatoire";
                    feedbackLName.classList.remove("text-success");
                    feedbackLName.classList.add("text-danger");
                    return false;
                } else {
                    console.log("ça marche");
                    const feedbackLName = document.getElementById("feedback-lastname");
                    feedbackLName.innerHTML = "le nom est valide";
                    feedbackLName.classList.remove("text-danger");
                    feedbackLName.classList.add("text-success");
                    return true;
                }
            });
        // };
        // validLastName();

        //Test email
        // const validMail = () => {
            emailForm.addEventListener("change", () => {
                if (validEmail.test(emailForm.value)) {
                    console.log("ça marche");
                    const feedbackEmail = document.getElementById("feedback-email");
                    feedbackEmail.innerHTML = "l'email est valide";
                    feedbackEmail.classList.remove("text-danger");
                    feedbackEmail.classList.add("text-success");
                    return true;
                } else {
                    console.log("ça marche pas");
                    const feedbackEmail = document.getElementById("feedback-email");
                    feedbackEmail.innerHTML = "l'email n'est pas valide";
                    feedbackEmail.classList.remove("text-success");
                    feedbackEmail.classList.add("text-danger");
                    return false;
                }
            });
        // };
        // validMail();

        //Test adresse
        // const validAddress = () => {
            addressForm.addEventListener("change", () => {
                if (addressForm.value == "" || validCharacter.test(addressForm.value) == true) {
                    console.log("ça marche pas");
                    const feedbackAddress = document.getElementById("feedback-address");
                    feedbackAddress.innerHTML = "l'adresse n'est pas valide";
                    feedbackAddress.classList.remove("text-success");
                    feedbackAddress.classList.add("text-danger");
                    return false;
                } else {
                    console.log("ça marche");
                    const feedbackAddress = document.getElementById("feedback-address");
                    feedbackAddress.innerHTML = "l'adresse est valide";
                    feedbackAddress.classList.remove("text-danger");
                    feedbackAddress.classList.add("text-success");
                    return true;
                }
            });
        // };
        // validAddress();

        //Test ville
        // const validCity = () => {
            cityForm.addEventListener("change", () => {
                if (cityForm.value == "" || validCharacter.test(cityForm.value) == true || validNumber.test(cityForm.value) == true) {
                    console.log("ça marche pas");
                    const feedbackCity = document.getElementById("feedback-city");
                    feedbackCity.innerHTML = "Une ville valide est obligatoire";
                    feedbackCity.classList.remove("text-success");
                    feedbackCity.classList.add("text-danger");
                    return false;
                } else {
                    console.log("ça marche");
                    const feedbackCity = document.getElementById("feedback-city");
                    feedbackCity.innerHTML = "le prénom est valide";
                    feedbackCity.classList.remove("text-danger");
                    feedbackCity.classList.add("text-success");
                    return true;
                }
            });
        // };
        // validCity();

        //écoute de la soumission du formulaire
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (firstNameForm.value && lastNameForm.value && emailForm.value && addressForm.value && cityForm.value) {
                currentCart.forEach((product) => {
                    products.push(product._id);
                });
                contact = {
                    firstName: firstNameForm.value,
                    lastName: lastNameForm.value,
                    email: emailForm.value,
                    address: addressForm.value,
                    city: cityForm.value
                };
                const order = {contact, products};
                fetch("http://localhost:3000/api/cameras/order", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(order),
                }).then(response => response.json()).then(response => {
                    let valid = response;
                    localStorage.setItem("order", JSON.stringify(valid));
                    localStorage.setItem("priceCart", totalPrice); // Stocke le prix total dans localStorage
                    document.location.href = "validate.html"; // Redirection vers la page confirmation
                }).catch((error) => {
                    console.error('Erreur de connexion, veuillez réessayer:', error); //Si l'envoie a échoué, la console renvoie une erreur 
                });
            }
        });
} else {
    console.log("panier vide");
    };
};

productAdded();



