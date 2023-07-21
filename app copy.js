const products = stock

// Variables globales
let currentPage = 1;
const productsPerPage = 15;
let filteredProducts = products;
let currentCategory = null;

// Función para mostrar los productos en una página específica
function showProducts(page) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    const productsContainer = document.getElementById("productsContainer");
    productsContainer.innerHTML = "";

    productsToShow.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "cuadrado";
        productDiv.innerHTML = `
        <div class="imagen">
                        <img src="${product.img}" alt="">
                    </div>
                    <div class="info-produc">
                        <div class="texto-producto">
                            <p class="nombre-producto">${product.nombre}</p>
                            <p class="precio"><span>$</span>${formatNumberWithCommas(product.precio)}</p>
                            </div>
                        <div class="contenedor-agregar">
                            <input type="number" id="quantity${product.id}" value="0" min="0">
                            <button onclick="addToCart(${product.id})">Agregar al carrito</button>
                        </div>
                        <button class="btn-mas-info" onclick="showProductDetails(${product.id})">Más información</button>
                    </div>
        `;
        productsContainer.appendChild(productDiv);
        
    });

    document.getElementById("currentPage").innerText = `Página ${page} de ${Math.ceil(filteredProducts.length / productsPerPage)}`;

    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");

    if (page === 1) {
        prevPageBtn.disabled = true;
    } else {
        prevPageBtn.disabled = false;
    }

    if (page === Math.ceil(filteredProducts.length / productsPerPage)) {
        nextPageBtn.disabled = true;
    } else {
        nextPageBtn.disabled = false;
    }
}

// Función para filtrar productos por categoría
function filterProductsByCategory(category) {
    currentCategory = category;
    if (category) {
        filteredProducts = products.filter(product => product.category === category);
    } else {
        filteredProducts = products;
    }
    currentPage = 1;
    showProducts(currentPage);
}

// Función para mostrar los botones de categoría
function showCategoryButtons() {
    const categoryButtons = document.getElementById("categoryButtons");
    categoryButtons.innerHTML = "";

    const categories = Array.from(new Set(products.map(product => product.category))); // Obtener categorías únicas

    categories.forEach(category => {
        const button = document.createElement("button");
        button.innerText = category;
        button.addEventListener("click", () => filterProductsByCategory(category));
        categoryButtons.appendChild(button);
    });
}

// Función para filtrar productos según el término de búsqueda
function filterProducts(searchTerm) {
    if (currentCategory) {
        filteredProducts = products.filter(product => product.category === currentCategory && product.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
        filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    currentPage = 1;
    showProducts(currentPage);
}

// Evento de clic para el botón de búsqueda
document.getElementById("searchBtn").addEventListener("click", () => {
    const searchTerm = document.getElementById("buscador").value.trim();
    filterProducts(searchTerm);
});

// Evento de presionar Enter en el campo de búsqueda
document.getElementById("buscador").addEventListener("keypress", event => {
    if (event.key === "Enter") {
        const searchTerm = event.target.value.trim();
        filterProducts(searchTerm);
    }
});

// Evento de clic para la página anterior
document.getElementById("prevPageBtn").addEventListener("click", () => {
    currentPage--;
    showProducts(currentPage);
});

// Evento de clic para la siguiente página
document.getElementById("nextPageBtn").addEventListener("click", () => {
    currentPage++;
    showProducts(currentPage);
});

// Mostrar todos los productos al cargar la página
showProducts(currentPage);
showCategoryButtons();


function showProductDetails(productId) {
    const product = products.find(product => product.id === productId);
    if (product) {
        // Redireccionar a la página de detalles del producto
        window.location.href = `product.html?id=${product.id}`;
    }
}

let inicio = document.getElementById("inicio");

inicio.addEventListener("click", function() {
    window.location.href = "index.html";
  });

  // Función para agregar un producto al carrito
  function addToCart(productId) {
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
        const quantityInput = document.getElementById(`quantity${productId}`);
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.product.id === productId);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push({ product: selectedProduct, quantity: quantity });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Producto agregado al carrito');
            quantityInput.value = "0";
            updateCartCount();
        }
    }
}



// Función para redirigir al carrito de compras
function goToCart() {
    window.location.href = 'cart.html';
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  let inicio2 = document.querySelector(".logo")
inicio2.addEventListener("click",()=>{
    window.location.href = 'index.html';
})

function updateCartCount() {
    const cart = getCart();
    const cartCount = cart.length; // Obtener la longitud del arreglo para obtener el número de productos diferentes
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount.toString();
}
  
  // Llama a la función para actualizar el número de productos en el carrito al cargar la página

  function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  updateCartCount();