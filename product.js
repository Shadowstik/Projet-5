

const selectedLens = async () => {

    const idLens = location.search.substring(4);

    let response = await fetch(`http://localhost:3000/api/cameras/${idLens}`);
    if (response.ok) {
        let data = await response.json();

        const lensType = document.getElementById("card-lens");
        lensType.innerHTML +=
            `<h1 class="text-center text-primary" id="main-title">${data.name}</h1>
        <div class="card mt-4">
            <img class="card-img-top img-fluid" src="${data.imageUrl}" alt="${data.name}" id="img-product">
            <div class="card-body">
                <h2 class="card-title">${data.name}</h2>
                <p class="h5" id="price">${data.price / 100}€</p>
                    <div class="row">
                        <div class="input-group mb-3 col-12 col-sm-6">
                            <div class="input-group-prepend">
                                <label class="input-group-text h6" for="lenses">Options de lentilles</label>
                            </div>
                            <select class="custom-select" id="lenses"></select>
                        </div>
                        <div class="input-group mb-3 col-12 col-sm-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text h6" for="quantity">Quantité</label>
                            </div>
                            <input type="number" min="1" max="10" value="1" name="product_qty" id="quantity"
                                class="form-control" placeholder="Quantité" aria-label="Quantité"
                                aria-describedby="quantity">
                        </div>
                        <div class="mb-3 col-12 col-sm-3">
                            <div type="button" class="btn btn-primary" id="add-to-cart">Ajouter au panier
                            </div>
                        </div>
                    </div>
                <p class="card-text" id="resume">${data.description}</p>
                <span class="text-warning">&#9733; &#9733; &#9733; &#9733; &#9734;</span>
                4.0 étoiles
            </div>
        </div>`

        // ajout des option de lentille

        const selectorLens = document.getElementById("lenses");
        data.lenses.forEach(lens => {
            const optionLens = document.createElement("option");
            optionLens.innerHTML = `${lens}`;
            selectorLens.appendChild(optionLens);
        });

        // création du panier de l'utilisateur

        const cartInit = [];
        const addLens = JSON.parse(localStorage.getItem("userCart"));
        const product = {
            idProduct: `${data._id}`,
            nameProduct: `${data.name}`,
            imageProduct: `${data.imageUrl}`,
            priceProduct: `${data.price / 100}`,
            quantityProduct: `${1}`
        };
        // création du bouton panier de l'utilisateur
        if (localStorage.getItem("userCart") === null) {

            localStorage.setItem("userCart", JSON.stringify(cartInit));
            console.log(localStorage.getItem("userCart"));
        } else {
            const addCart = () => {
                const btnAddCart = document.getElementById("add-to-cart");
                btnAddCart.addEventListener("click", () => {
                    cartInit.push(product);
                    console.log(cartInit);
                });
            };
            addCart();
        };
    };
};
selectedLens();
console.log(localStorage.length);





