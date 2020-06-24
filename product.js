

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
                            <button type="button" class="btn btn-primary" id="add-to-cart">Ajouter au panier
                            </button>
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

        // données du produit à ajouter au panier

        const product = {
            idProduct: `${data._id}`,
            nameProduct: `${data.name}`,
            imageProduct: `${data.imageUrl}`,
            priceProduct: `${data.price / 100}`,
            quantityProduct: `${1}`
        };

        let userCart;

        // création d'un panier s'il n'existe pas 

        if(localStorage.getItem("userCart") === null) {
            userCart = [];
        } else {
            userCart = JSON.parse(localStorage.getItem("userCart"));
        }

        // fonction d'ajout au panier

        const addToCart = () => {
            const btnAddCart = document.getElementById("add-to-cart");
            btnAddCart.addEventListener("click", () => {
                userCart.push(product);
                userCart.quantityProduct ++;
                numberItemCart();
                localStorage.setItem("userCart", JSON.stringify(userCart));
                
            });
        };
        addToCart();
        
        // fonction de nombre d'article au panier

        const numberItemCart = () => {
            let cartCount = document.getElementById("cart-count");
            cartCount.innerHTML = userCart.length;
        }
    };
};
selectedLens();















