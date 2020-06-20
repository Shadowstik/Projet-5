

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
        const selectorLens = document.getElementById("lenses");
        data.lenses.forEach(lens => {
            const optionLens = document.createElement("option");
            optionLens.innerHTML = `${lens}`;
            selectorLens.appendChild(optionLens);
        });
    };
}
selectedLens();

// // Vérifie la présence d'un panier dans le localStorage sinon en créer un

// if (localStorage.getItem("userCart")) {
//     console.log("L'utilisateur a un panier existant");
// } else {
//     console.log("L'utilisateur ne possède pas de panier celui-cui va être créer");
//     let cart = [];
//     localStorage.setItem("userCart", JSON.stringify(cart));
// }

// // ressources demandés par l'api

// const contact;
// const product = [];

// // l'utilsateur possède un panier

// const userCart = JSON.parse(localStorage.getItem("userCart"));

// // fonction d'ajout au panier 

// const addCart = () => {
//     const buttonCart = document.getElementById("add-to-cart");
//     buttonCart.addEventListener("click",)

// }
