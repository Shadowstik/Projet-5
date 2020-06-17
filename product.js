/* const optionProduct = response[i].lenses;
*/

// insertion titre du produit

const titleProduct = document.getElementById("main-title");
titleProduct.textContent = "nameProduct";

// insertion image du produit

const imageProduct = document.getElementById("img-product");
imageProduct.setAttribute("src", "imageProduct");
imageProduct.setAttribute("alt", "nameProduct");

// insertion nom du produit

const nameProduct = document.getElementsByClassName("card-title");
titleProduct.textContent = "nameProduct";

// insertion prix du produit

const priceProduct = document.getElementById("price");
priceProduct.textContent = "priceProduct" + " " + "€";

// insertion options du produit

const optionLens = document.getElementById("lenses");

/*for (let i = 0; i < response.length; I++) {
    const lensesProduct = document.createElement("option");
    lensesProduct.setAttribute("value", optionProduct[i][i]);
    optionLens.appendChild(lensesProduct);
}*/

// insertion donnée du produit au bouton d'ajout au panier

const addCart = document.getElementById("add-to-cart");
addCart.setAttribute("data-id", "idProduct");

// insertion titre du produit