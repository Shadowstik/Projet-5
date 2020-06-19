
// Récupération des données de l'api pour les lentilles de caméra vintage

const getProduct = async () => {
    try {
        let response = await fetch("http://localhost:3000/api/cameras/");
        if (response.ok) {
            let data = await response.json();
            console.log(data);

            const products = document.getElementById("all-products");
            //console.log(products);
            const lenses = data;

            // génération des composants pour chaque fiche produit

            lenses.forEach(lens => {
                products.innerHTML +=
                    `<div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100">
                            <img src="${lens.imageUrl}" alt="${lens.name}" class="card-img-top">
                            <div class="card-body">
                                <h2 class="card-title">${lens.name}</h2>
                                <p class="price h4">${lens.price / 100}€</p>
                                <p class="card-text">${lens.description}</p>
                            </div>
                            <div class="card-footer">
                                <a href="product.html?id=${lens._id}"" class="btn btn-primary">Voir le produit !</a>
                            </div>
                        </div>
                    </div>`;
                //console.log(products);    
            });
        } else {
            console.error(`Erreur ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    };
};

getProduct();