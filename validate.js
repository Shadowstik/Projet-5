const orderNumber = localStorage.getItem("id")
const priceOder = localStorage.getItem("priceCart")

const prix= document.getElementById('prix')
const id = document.getElementById('id')

prix.innerHTML = prixCommande + " euros"
id.innerHTML =  numerosCommande

localStorage.removeItem('obj')