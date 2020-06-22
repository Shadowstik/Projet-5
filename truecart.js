
const lensAdded = async () => {
    let response = await fetch("http://localhost:3000/api/cameras/");
    if (response.ok) {
        let data = await response.json();

        // récupération des données du panier (localStorage)

        const currentCart = JSON.parse(localStorage.getItem("userCart"));
        console.log(currentCart);
        
        if (currentCart.length > 0) {

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
                </tr>
            </thead>
            <tbody id="cart-tablebody"></tbody>
        </table>
        <p class="subtotal">Sous-total: <span>0</span> €</p>`


            // pour chaque produit ajouter dans le panier

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
                    <td class="text-right">
                        <form action="" method="POST">
                            <input type="hidden" name="product_id" value="${product.idProduct}">
                            <button type="submit" class="btn btn-secondary">X</button>
                        </form>
                     </td>
                </tr>`
            });
        } else {
            console.log("panier vide");
        }
    };

};
lensAdded();




