const products = stock

// Variables globales
let currentPage = 1;
const productsPerPage = 16;
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
        productDiv.className = `cuadrado`;
        productDiv.innerHTML = `
        <div class="imagen" onclick="showProductDetails(${product.id})"> <!-- Aplica el evento click al div de la imagen -->
            <img src="${product.img}" alt="" data-product-id="${product.id}">
        </div>
                    <div class="info-produc">
                        <div class="texto-producto">
                            <p class="nombre-producto">${product.nombre}</p>
                            <p class="precio"><span>$</span>${formatNumberWithCommas(product.precio)}</p> <!-- Mostrar el precio con descuento -->
                        </div>
                        <div class="contenedor-agregar">
                            <input type="number" id="quantity${product.id}" value="1" min="1">
                            <div class="conte-cantidad">
                                <button class="btn-mas" onclick="increaseQuantity(${product.id})">+</button>
                                <button class="btn-menos" onclick="decreaseQuantity(${product.id})">-</button>
                        </div>
                            <button class="btn-agregar" onclick="addToCart(${product.id})">Agregar al carrito</button>
                        </div>
                        <button class="btn-mas-info" onclick="showProductDetails(${product.id})">Más información</button>
                    </div>
        `;
        productsContainer.appendChild(productDiv);
    });
    

    document.getElementById("currentPage").innerText = `Página ${page} de ${Math.ceil(filteredProducts.length / productsPerPage)}`;

    const prevPageBtn = document.getElementById("prevPageBtn");
    const nextPageBtn = document.getElementById("nextPageBtn");

    // if (page === 1) {
    //     prevPageBtn.disabled = true;
    // } else {
    //     prevPageBtn.disabled = false;
    // }

    // if (page === Math.ceil(filteredProducts.length / productsPerPage)) {
    //     nextPageBtn.disabled = true;
    // } else {
    //     nextPageBtn.disabled = false;
    // }
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
    updatePaginationButtons();
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


// Evento de presionar Enter en el campo de búsqueda
document.getElementById("buscador").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const searchTerm = event.target.value.trim();
        filterProducts(searchTerm);
        updatePaginationButtons();
        document.getElementById("buscador").blur();
        event.preventDefault(); // Prevenir el comportamiento predeterminado de la tecla "Enter" (envío del formulario)
    }

});



// // Evento de clic para la página anterior
// document.getElementById("prevPageBtn").addEventListener("click", () => {
//     currentPage--;
//     showProducts(currentPage);
//     window.scrollTo(0, 0);
// });

// // Evento de clic para la siguiente página
// document.getElementById("nextPageBtn").addEventListener("click", () => {
//     currentPage++;
//     showProducts(currentPage);
//     window.scrollTo(0, 0);
// });

// Función para mostrar los botones de paginación
function updatePaginationButtons() {
    const paginationContainer = document.getElementById("pagination");
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const maxVisibleButtons = 9; // Número máximo de botones visibles

    paginationContainer.innerHTML = ''; // Limpia los botones existentes

    // Calcula el rango de botones que se mostrarán
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    // Ajusta el rango si se excede
    if (endPage - startPage + 1 < maxVisibleButtons) {
        startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = page;

        // Agregar la clase "activation" al botón de la página actual
        if (page === currentPage) {
            pageButton.classList.add("activation");
        }

        pageButton.addEventListener("click", () => {
            currentPage = page;
            showProducts(currentPage);
            window.scrollTo(0, 0);
            updatePaginationButtons();
        });
        paginationContainer.appendChild(pageButton);
    }
}

// Llamada inicial para mostrar los botones de paginación
updatePaginationButtons();





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

// Función para incrementar la cantidad de piezas en 1
function increaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity${productId}`);
    const currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = (currentQuantity + 1).toString();
  }
  
  // Función para decrementar la cantidad de piezas en 1
  function decreaseQuantity(productId) {
    const quantityInput = document.getElementById(`quantity${productId}`);
    const currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      quantityInput.value = (currentQuantity - 1).toString();
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

  // Función para manejar la búsqueda y filtrar productos
function handleSearch() {
    const searchTerm = document.getElementById("buscador").value.trim();
    filterProducts(searchTerm);
}

document.getElementById("buscador").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        handleSearch();

        // Borrar el texto del campo de búsqueda
        // document.getElementById("buscador").value = "";

        event.preventDefault(); // Prevent the default behavior of the Enter key (form submission)
    }
});

// document.getElementById("buscador").addEventListener("input", handleSearch);

// Manejar el evento de popstate (regresar de página)
window.onpopstate = function(event) {
    if (event.state) {
        const searchTerm = event.state.searchTerm;
        document.getElementById("buscador").value = searchTerm;

        handleSearch();
    }
};

// Función para cargar la página y mostrar los productos
window.onload = function() {
    const searchTerm = document.getElementById("buscador").value.trim();
    filterProducts(searchTerm);
};

// Evento de regresar de página
window.addEventListener("popstate", function() {
    handleSearch();
});

// Función para buscar sinónimos de una palabra
function findSynonyms(word) {
    const synonyms = {
        boligrafo: ["pluma"],
        // Agrega más sinónimos y palabras clave según tus necesidades
    };

    const lowerWord = word.toLowerCase();

    for (const key in synonyms) {
        if (synonyms[key].includes(lowerWord)) {
            return key;
        }
    }

    return lowerWord;
}

// Función para filtrar productos según el término de búsqueda
function filterProducts(searchTerm) {
    searchTerm = searchTerm.toLowerCase(); // Convertimos el término de búsqueda a minúsculas

    const searchTermOrSynonym = findSynonyms(searchTerm);

    if (currentCategory) {
        filteredProducts = products.filter(product => 
            product.category === currentCategory && (
                product.nombre.toLowerCase().includes(searchTermOrSynonym) ||
                product.id.toString().toLowerCase().includes(searchTermOrSynonym)
            )
        );
    } else {
        filteredProducts = products.filter(product => 
            product.nombre.toLowerCase().includes(searchTermOrSynonym) ||
            product.id.toString().toLowerCase().includes(searchTermOrSynonym)
        );
    }

    currentPage = 1;
    showProducts(currentPage);

}






  


