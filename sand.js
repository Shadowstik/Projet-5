if (localStorage.getItem("userCart") === null) {
    const cartInit = [];
    localStorage.setItem("userCart", JSON.stringify(cartInit));
}
const countCart = document.getElementById("count-cart");
const userCart = JSON.parse(localStorage.getItem("userCart"));
countCart.innerHTML = `${userCart.length}`;
console.log(countCart);

const addCart = () => {
    const buttonCart = document.getElementById("add-to-cart");
    buttonCart.addEventListener("click", () => {
        const product = data;
        userCart.push(product);
        console.log(userCart);
        localStorage.setItem("userCart", JSON.stringify(userCart));
        console.log("Administration : le produit a été ajouté au panier");
        alert("Le produit a été ajouté au panier");
    });
}
addCart();


// const cartInit = [];
// localStorage.setItem("userCart", JSON.stringify(cartInit));

// // panier de l'utilisateur 

// const userCart = localStorage.getItem("userCart");
// console.log(userCart);

// // ressource nécessaire pour commander via l'api

// const contact = 0;
// const products = [];

// const addCart = () => {
//     const buttonCart = document.getElementById("add-to-cart");
//     buttonCart.addEventListener("click", () => {
//         const product = data;
//         userCart.push(product);
//         console.log(userCart);
//         localStorage.setItem("userCart", JSON.stringify(userCart));
//         console.log("Administration : le produit a été ajouté au panier");
//         alert("Le produit a été ajouté au panier");
//     });
// }
// addCart();
};

//add new key=>value to the HTML5 storage
function SaveItem() {
			
	var name = document.forms.ShoppingList.name.value;
	var data = document.forms.ShoppingList.data.value;
	localStorage.setItem(name, data);
	doShowAll();
	
}
//------------------------------------------------------------------------------
//change an existing key=>value in the HTML5 storage
function ModifyItem() {
	var name1 = document.forms.ShoppingList.name.value;
	var data1 = document.forms.ShoppingList.data.value;
	//check if name1 is already exists
	
//check if key exists
			if (localStorage.getItem(name1) !=null)
			{
			  //update
			  localStorage.setItem(name1,data1);
			  document.forms.ShoppingList.data.value = localStorage.getItem(name1);
			}
		
	
	doShowAll();
}
//-------------------------------------------------------------------------
//delete an existing key=>value from the HTML5 storage
function RemoveItem() {
	var name = document.forms.ShoppingList.name.value;
	document.forms.ShoppingList.data.value = localStorage.removeItem(name);
	doShowAll();
}
//-------------------------------------------------------------------------------------
//restart the local storage
function ClearAll() {
	localStorage.clear();
	doShowAll();
}
//--------------------------------------------------------------------------------------
// dynamically populate the table with shopping list items
//below step can be done via PHP and AJAX too. 
function doShowAll() {
	if (CheckBrowser()) {
		var key = "";
		var list = "<tr><th>Item</th><th>Value</th></tr>\n";
		var i = 0;
		//for more advance feature, you can set cap on max items in the cart
		for (i = 0; i <= localStorage.length-1; i++) {
			key = localStorage.key(i);
			list += "<tr><td>" + key + "</td>\n<td>"
					+ localStorage.getItem(key) + "</td></tr>\n";
		}
		//if no item exists in the cart
		if (list == "<tr><th>Item</th><th>Value</th></tr>\n") {
			list += "<tr><td><i>empty</i></td>\n<td><i>empty</i></td></tr>\n";
		}
		//bind the data to html table
		//you can use jQuery too....
		document.getElementById('list').innerHTML = list;
	} else {
		alert('Cannot save shopping list as your browser does not support HTML 5');
	}
}

/*
 =====> Checking the browser support
 //this step may not be required as most of modern browsers do support HTML5
 */
 //below function may be redundant
function CheckBrowser() {
	if ('localStorage' in window && window['localStorage'] !== null) {
		// we can use localStorage object to store data
		return true;
	} else {
			return false;
	}
}
//--------------