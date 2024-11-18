let general = JSON.parse(sessionStorage.getItem("usuarioContenido"));
let contenedo = document.querySelector(".my-orders-section");
let total = document.querySelector(".productTotal")
let fecha = document.querySelector(".my-orders__item__date") 
let cantidad = document.querySelector(".my-orders__item__amount") 
const fechaActual = new Date();
const fechaSolo = fechaActual.toLocaleDateString();
if (general && general.currentSelectedProducts) {
    eventos();
    total.textContent = `$${general.currentSelectedProducts.reduce((acc, item) => acc + item.price,0) } `
    fecha.textContent = fechaSolo 
    cantidad.textContent = `${general.currentSelectedProducts.length} articles`
} else {
    console.log("No se encontró información del usuario o productos seleccionados");
}

function eventos() {
    document.addEventListener("DOMContentLoaded", agregandoProduc);
}

function agregandoProduc() {
    general.currentSelectedProducts.forEach(element => {
        let dato = document.createElement("article");
        dato.classList.add("shopping-card-item");
        
        let nombreProducto = element.name 
        let precioProducto = element.price 
        let imagenProducto = element.imgs[0].img
        
        dato.innerHTML = `
            <div class="front-container">
                <div class="image-border" style="background-image: url(${imagenProducto});"></div>
                <span class="name-product">${nombreProducto}</span>
            </div>
            <div class="back-container">
                <span class="price-product">$   ${precioProducto}</span>
            </div>
        `;
        
        contenedo.append(dato);
    });
}
