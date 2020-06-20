

const lensAdded = () => {
    const cartPlace = document.getElementById("cart");
    cartPlace.innerHTML =
    
        `<div class="d-flex justify-content-between align-items-center mb-3 h3">
            <h2 class="text-primary h3">Votre panier</h2>
            <span class="badge badge-primary badge-pill">${data.quantity}</span>
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

        const addLens  = document.getElementById("cart-tablebody");
        addLens.innerHTML += 
        `<tr>
        <td>${data.name}</td>
        <td>${data.price}</td>
        <td>${data.quantity}</td>
        </tr>`
}

lensAdded();
