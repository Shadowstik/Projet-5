class AddCart {
    constructor (id, name, price, description, imageUrl) {
        this.productId = id;
        this.productName = name;
        this.productPrice = price;
        this.productDescription = description;
        this.productImageUrl = imageUrl;
    }
};

const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response.lenses.name);
};

request.open("GET", "http://localhost:3000/api/cameras");
request.send();