
const productAdded = async () => {
    let response = await fetch("http://localhost:3000/api/cameras/");
    if (response.ok) {
        let data = await response.json();


        // récupération des données du panier (localStorage)

        const currentCart = JSON.parse(localStorage.getItem("userCart"));

        // création du panier lorsqu'un produit a été ajouté
        if (currentCart.length > 0) {
            
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

            // fonction pour calculer le prix total des articles dans le panier

            let totalPrice = 0;

            currentCart.forEach(product => {
                totalPrice += parseInt(product.price/100);
            });

            const total = document.getElementById("total-cart");
            total.innerHTML = totalPrice + "€";

            
            // création du bouton de suppression du panier
            const btnEmptyCart = document.createElement("button");
            btnEmptyCart.setAttribute("class", "col-6 btn btn-primary");
            btnEmptyCart.textContent = "Vider le panier !";
            cartFooter.appendChild(btnEmptyCart);

            // création de la ligne du produit du panier pour chaque produit
            currentCart.forEach(product => {

            // création de la ligne du produit ajouté au panier
            const rowProduct = document.createElement("tr");
            rowProduct.setAttribute("class", "text-left h6");
            tableBody.appendChild(rowProduct);

            const productTitle = document.createElement("td");
            productTitle.setAttribute("class", "align-middle");
            rowProduct.appendChild(productTitle);

            const productImage = document.createElement("img");
            productImage.setAttribute("src", product.imageUrl);
            productImage.setAttribute("alt", "name");
            productImage.setAttribute("width", "100");
            productTitle.appendChild(productImage);

            const productName = document.createElement("span");
            productName.setAttribute("class", "align-middle pl-3");
            productName.innerHTML = product.name;
            productTitle.appendChild(productName);

            const productPrice = document.createElement("td");
            productPrice.setAttribute("class", "align-middle");
            productPrice.innerHTML = product.price/100 + "€";
            rowProduct.appendChild(productPrice);

            const productQuantity = document.createElement("td");
            productQuantity.setAttribute("class", "align-middle");
            productQuantity.innerHTML = 1;
            rowProduct.appendChild(productQuantity);

            const subTotalPrice = document.createElement("td");
            subTotalPrice.setAttribute("class", "align-middle");
            subTotalPrice.innerHTML = 1 * product.price/100 + "€";
            rowProduct.appendChild(subTotalPrice);

            const cellBtnRemove = document.createElement("td");
            cellBtnRemove.setAttribute("class", "align-middle border-0");
            rowProduct.appendChild(cellBtnRemove);

            const btnRemoveProduct = document.createElement("button");
            btnRemoveProduct.setAttribute("type", "button");
            btnRemoveProduct.setAttribute("id", "product-id");
            btnRemoveProduct.setAttribute("class", "btn btn-secondary");
            btnRemoveProduct.innerHTML = "X";
            cellBtnRemove.appendChild(btnRemoveProduct);
            });

            
            // // fonction pour retirer un produit du panier

            // const removeCam = () => {
            //     let deleteItem = document.getElementById("product.idProduct");
            //     deleteItem.addEventListener("click", () => {
            //         currentCart.splice(product.idProduct, 1);
            //         localStorage.setItem("userCart", JSON.stringify(userCart));
            //     });
            // };
            // removeCam();

            // const removeCam = (i) => { 

            //     currentCart.splice(i, 1);
            //     localStorage.clear();
            //     localStorage.setItem("userCart", JSON.stringify(userCart));
                
            // };
        } else {
            console.log("panier vide");
        }
    };

};
productAdded();





