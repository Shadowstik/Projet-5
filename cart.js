

class RowCart {
    constructor (name, price, imageUrl, qte) {
        this.productName = name;
        this.productPrice = price;
        this.productImageUrl = imageUrl;
        this.productQte = qte;
        this.addQte = function(qte) {
            this.productQte += qte;
        }
        this.getRowPrice = function() {
            let result = this.productPrice * this.productQte;
            return result;
        }
        this.getName = function() {
            return this.productName;
        }

    }
};

function cart () {
    this.liste = [];
    this.addProduct = function(name, price, imageUrl, qte) { 
        let index = this.getProduct(name);
        if (index == -1) this.liste.push(new RowCart(name, price, imageUrl, qte));
        else this.liste[index].addQte(qte);
    }
    this.getPriceCart = function() {
        let total = 0;
        for(let i = 0 ; i < this.liste.length ; i++)
            total += this.liste[i].getRowPrice();
        return total;
    }
    this.getProduct = function(name) {
        for(var i = 0 ; i <this.liste.length ; i++)
            if (name == this.liste[i].getName()) return i;
        return -1;
    }
    this.removeProduct = function(name)
    {
        let index = this.getProdcut(name);
        if (index > -1) this.liste.splice(index, 1);
    }
}

const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response.lenses.name);
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();