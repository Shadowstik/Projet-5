
const productAdded = async () => {
    try {
        // récupération des données du panier dans le localStorage
        let currentCart = JSON.parse(localStorage.getItem("userCart"));

        // création du panier lorsqu'un produit a été ajouté
        if (currentCart !== null) {

            // affiche le nombre de produit actuellement dans le panier
            const numberProductCart = document.getElementById("cart-count");
            numberProductCart.innerHTML = currentCart.length;

            // masquage du message d'alerte indiquant que le panier est vide
            const alertEmpty = document.querySelector("p.alert");
            alertEmpty.classList.add("invisible");

            const cartPlace = document.getElementById("cart");

            // création de la structure du panier sous forme de tableau 
            const tableCart = document.createElement("table");
            tableCart.setAttribute("class", "table table-responsive table-hover text-secondary text-center");
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
            cartFooter.setAttribute("class", "row text-center mx-auto px-5");
            cartPlace.appendChild(cartFooter);

            // création de la section "total" du panier
            const totalCart = document.createElement("p");
            totalCart.setAttribute("class", "col-10 col-md-6 mx-auto h5 my-3 p-0 align-middle");
            totalCart.textContent = "TOTAL À PAYER: ";
            cartFooter.appendChild(totalCart);

            const totalCartValue = document.createElement("span");
            totalCartValue.setAttribute("id", "total-cart");
            totalCartValue.setAttribute("class", "text-primary");
            totalCart.appendChild(totalCartValue);

            // liste des id des produit présent dans le panier
            const arrayIdCart = [];
            let k = 0;
            currentCart.forEach((idCart) => {
                arrayIdCart[k] = idCart._id;
                k++;
            });

            //nombre d'occurence par id de produit
            const occurrences = arrayIdCart.reduce((obj, item) => {
                obj[item] = (obj[item] || 0) + 1;
                return obj;
            }, {});

            //pour chaque occurence différente d'un produit du panier création d'une ligne produit
            let i = 0;

            for (let [key, quantity] of Object.entries(occurrences)) {
                const uri = "http://localhost:3000/api/cameras/" + key;
                const encodedRequest = encodeURI(uri);
                const response = await fetch(encodedRequest);
                const data = await response.json();
                const product = data;
                i++;

                // création de la ligne du produit ajouté au panier
                const rowProduct = document.createElement("tr");
                rowProduct.setAttribute("class", "text-center h6");
                rowProduct.setAttribute("id", product._id);
                tableBody.appendChild(rowProduct);

                const productTitle = document.createElement("td");
                productTitle.setAttribute("class", " text-left align-middle");
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
                subTotalPrice.innerHTML = quantity * product.price / 100 + " €";
                rowProduct.appendChild(subTotalPrice);

                // bouton permettant de supprimer un produit
                const cellBtnRemove = document.createElement("td");
                cellBtnRemove.setAttribute("class", "align-middle border-0");
                rowProduct.appendChild(cellBtnRemove);

                const btnRemoveProduct = document.createElement("button");
                btnRemoveProduct.setAttribute("type", "button");
                btnRemoveProduct.setAttribute("id", "btn-remove" + i);
                btnRemoveProduct.setAttribute("class", "btn btn-secondary");
                btnRemoveProduct.innerHTML = "X";
                cellBtnRemove.appendChild(btnRemoveProduct);

                //récupération de l'élément bouton pour supprimer un article
                document.getElementById("btn-remove" + i).onclick = () => {
                    currentCart.forEach((idProduct) => {
                        arrayIdCart[k] = idProduct._id;
                        k++;
                    });
                    const indexId = arrayIdCart.indexOf(key);
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
            btnEmptyCart.setAttribute("class", "col-8 col-md-6 mx-auto btn btn-secondary");
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

            //récupération des inputs du formulaire
            const form = document.getElementById("validForm");
            const firstNameForm = document.getElementById("firstName");
            const lastNameForm = document.getElementById("lastName");
            const emailForm = document.getElementById("email");
            const addressForm = document.getElementById("address");
            const cityForm = document.getElementById("city");

            // vérification des inputs du formulaire via les REGEX
            const validNumber = /[0-9]/;
            const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const validCharacter = /[§!@#$%^&*().?":{}|<>]/;

            //Vérification des champs de saisi du formulaire

            //vérification de l'input prénom
            firstNameForm.addEventListener("change", () => {
                if (firstNameForm.value == "" || validCharacter.test(firstNameForm.value) == true || validNumber.test(firstNameForm.value) == true) {
                    const feedbackFName = document.getElementById("feedback-firstname");
                    feedbackFName.innerHTML = "Un prénom valide est obligatoire";
                    feedbackFName.classList.remove("text-success");
                    feedbackFName.classList.add("text-danger");
                    return false;
                } else {
                    const feedbackFName = document.getElementById("feedback-firstname");
                    feedbackFName.innerHTML = "le prénom est valide";
                    feedbackFName.classList.remove("text-danger");
                    feedbackFName.classList.add("text-success");
                    return true;
                }
            });

            //vérification de l'input nom
            lastNameForm.addEventListener("change", () => {
                if (lastNameForm.value == "" || validCharacter.test(lastNameForm.value) == true || validNumber.test(lastNameForm.value) == true) {
                    const feedbackLName = document.getElementById("feedback-lastname");
                    feedbackLName.innerHTML = "Un nom valide est obligatoire";
                    feedbackLName.classList.remove("text-success");
                    feedbackLName.classList.add("text-danger");
                    return false;
                } else {
                    const feedbackLName = document.getElementById("feedback-lastname");
                    feedbackLName.innerHTML = "le nom est valide";
                    feedbackLName.classList.remove("text-danger");
                    feedbackLName.classList.add("text-success");
                    return true;
                }
            });

            //vérification de l'input email
            emailForm.addEventListener("change", () => {
                if (validEmail.test(emailForm.value)) {
                    const feedbackEmail = document.getElementById("feedback-email");
                    feedbackEmail.innerHTML = "l'email est valide";
                    feedbackEmail.classList.remove("text-danger");
                    feedbackEmail.classList.add("text-success");
                    return true;
                } else {
                    const feedbackEmail = document.getElementById("feedback-email");
                    feedbackEmail.innerHTML = "l'email n'est pas valide";
                    feedbackEmail.classList.remove("text-success");
                    feedbackEmail.classList.add("text-danger");
                    return false;
                }
            });

            //vérification de l'input adresse
            addressForm.addEventListener("change", () => {
                if (addressForm.value == "" || validCharacter.test(addressForm.value) == true) {
                    const feedbackAddress = document.getElementById("feedback-address");
                    feedbackAddress.innerHTML = "l'adresse n'est pas valide";
                    feedbackAddress.classList.remove("text-success");
                    feedbackAddress.classList.add("text-danger");
                    return false;
                } else {
                    const feedbackAddress = document.getElementById("feedback-address");
                    feedbackAddress.innerHTML = "l'adresse est valide";
                    feedbackAddress.classList.remove("text-danger");
                    feedbackAddress.classList.add("text-success");
                    return true;
                }
            });

            //vérification de l'input ville
            cityForm.addEventListener("change", () => {
                if (cityForm.value == "" || validCharacter.test(cityForm.value) == true || validNumber.test(cityForm.value) == true) {
                    const feedbackCity = document.getElementById("feedback-city");
                    feedbackCity.innerHTML = "Une ville valide est obligatoire";
                    feedbackCity.classList.remove("text-success");
                    feedbackCity.classList.add("text-danger");
                    return false;
                } else {
                    const feedbackCity = document.getElementById("feedback-city");
                    feedbackCity.innerHTML = "le prénom est valide";
                    feedbackCity.classList.remove("text-danger");
                    feedbackCity.classList.add("text-success");
                    return true;
                }
            });

            //écoute de la soumission du formulaire
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                if (firstNameForm.value && lastNameForm.value && emailForm.value && addressForm.value && cityForm.value) {
                    currentCart.forEach((product) => {
                        products.push(product._id);
                    });
                    const textEncoder = new TextEncoder();
                    contact = {
                        // les inputs sont encodés pour qu'il ne soient pas lisible lors du transfert
                        firstName: textEncoder.encode(firstNameForm.value),
                        lastName: textEncoder.encode(lastNameForm.value),
                        email: textEncoder.encode(emailForm.value),
                        address: textEncoder.encode(addressForm.value),
                        city: textEncoder.encode(cityForm.value)
                    };
                    const order = { contact, products };
                    const uriSend = "http://localhost:3000/api/cameras/order";
                    fetch(uriSend, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(order),
                    }).then(response => response.json()).then(response => {
                        let valid = response;

                        //stockage des données contact et products
                        localStorage.setItem("order", JSON.stringify(valid));

                        //stockage du prix total du panier
                        localStorage.setItem("priceCart", totalPrice);

                        //redirection vers la page confirmation de la commande
                        document.location.href = "validate.html";
                    }).catch((error) => {
                        console.error("Erreur de connexion, veuillez réessayer:", error);
                    });
                } else {
                    console.log("Il y a une erreur dans le formulaire");
                }
            });
        } else {
            alert("Votre panier est vide");
        };
    } catch (error) {
        console.log(error)
    }
};
productAdded();



