
const lensAdded = async () => {
    let response = await fetch("http://localhost:3000/api/cameras/");
    if (response.ok) {
        let data = await response.json();

        // récupération des données du panier (localStorage)

        const currentCart = JSON.parse(localStorage.getItem("userCart"));


        if (currentCart.length > 0) {
            console.log(currentCart);
            const cartPlace = document.getElementById("cart");
            cartPlace.innerHTML =

                `<div class="d-flex justify-content-between align-items-center mb-3 h3">
            <h2 class="text-primary h3">Votre panier</h2>
            <span class="badge badge-primary badge-pill"></span>
        </div>
        <table class="table text-secondary">
            <thead>
                <tr>
                    <th>Article</th>
                    <th>Prix</th>
                    <th>Quantité</th>
                    <th>Sous - total</th>
                </tr>
            </thead>
            <tbody id="cart-tablebody"></tbody>
        </table>
        <div class="row">
        <p class="col h4 my-0">Total à payer: <span id="sub-total"></span>€</p>
        <button class=" col btn btn-primary">Vider le panier !</button>
        </div>`

            // création d'une ligne pour chaque produit ajouter dans le panier

            const addLens = document.getElementById("cart-tablebody");
            currentCart.forEach(product => {
                addLens.innerHTML +=
                    `<tr>
                        <td>
                            <img src="${product.imageProduct}" alt="${product.nameProduct}" width="100">
                            </img> ${product.nameProduct}
                        </td>
                        <td>${product.priceProduct}€</td>
                        <td>${product.quantityProduct}</td>
                        <td>${product.priceProduct * product.quantityProduct}€</td>
                        <td class="text-right">
                            <button type="button" id="${product.idProduct}" class="btn btn-secondary">X</button>
                        </td>
                    </tr>`
            });

            // fonction pour calculer le prix total des articles dans le panier

            let totalPrice = 0;

            currentCart.forEach(product => {
                totalPrice += parseInt(product.priceProduct);
            });

            const total = document.getElementById("sub-total");
            total.innerHTML = totalPrice;

            // fonction pour retirer un produit du panier

            const removeCam = () => {
                let deleteItem = document.getElementById("product.idProduct");
                deleteItem.addEventListener("click", () => {
                    currentCart.splice(product.idProduct, 1);
                    localStorage.setItem("userCart", JSON.stringify(userCart));
                });
            };
            removeCam();

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
lensAdded();





