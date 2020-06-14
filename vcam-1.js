function addCart() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            var vcam = response[0];
            return vcam;
        }
    };
    request.open("GET", "http://localhost:3000/api/cameras");
    request.send();
};

var getCart = document.getElementById("cart-tablebody");
var rowEltCart = document.createA