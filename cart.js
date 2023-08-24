const products = stock;
    
    // Función para redireccionar a la página de detalles del producto
    function showProductDetails(productId) {
        const product = products.find(product => product.id === productId);
        if (product) {
            // Redireccionar a la página de detalles del producto
            window.location.href = `product.html?id=${product.id}`;
        }
    }
    
    // Función para cargar y mostrar los productos en el carrito
    function loadCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalElement = document.getElementById('total');
        const clearCartButton = document.getElementById('clear-cart'); // Botón para limpiar el carrito
        let total = 0;
    
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
            clearCartButton.style.display = 'none'; // Ocultar el botón cuando el carrito esté vacío
        } else {
            cartItemsContainer.innerHTML = '';
    
            cart.forEach(item => {
            const product = item.product;
            const quantity = item.quantity;
            const subtotal = product.precio * quantity;
            total += subtotal;
    
            const itemElement = document.createElement('tr');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <th><img src="${product.img}" alt="" onclick="showProductDetails(${product.id})"></th>
                <th onclick="showProductDetails(${product.id})">${product.nombre}</th>
                <th>$${formatNumberWithCommas(product.precio)}</th>
                <th>
                    <div class="juntos">
                        <input id="cantidad" type="number" value="${quantity}" min="1" onchange="updateQuantity(${product.id}, this.value)">
                        <button id="btn-elimi" onclick="removeFromCart(${product.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </th>
                <th>$${formatNumberWithCommas(subtotal.toFixed(1))}</th>
            `;
    
            cartItemsContainer.appendChild(itemElement);
        });
    
    
            const totalGeneralElement = document.getElementById('total');
            totalGeneralElement.textContent = `$${formatNumberWithCommas(total.toFixed(1))}`;
    
            clearCartButton.style.display = 'block'; // Mostrar el botón cuando haya productos en el carrito
        }
    
        updateCartCount();
    }
    
    
    
    
    // Función para limpiar el carrito
    function clearCart() {
        localStorage.removeItem('cart');
        loadCart();
        updateCartCount()
    }
    
    
    // Función para actualizar la cantidad de un producto en el carrito
    function updateQuantity(productId, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.product.id === productId);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity = parseInt(quantity);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
            updateCartCount();
        }
    }
    
    // Función para eliminar un producto del carrito
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        loadCart();
        updateCartCount()
    }
    
    // Función para vaciar el carrito
    function clearCart() {
        localStorage.removeItem('cart');
        loadCart();
        updateCartCount()
    }
    
    // Función para enviar el carrito por WhatsApp
    function sendCartToWhatsApp() {
      const cart = getCart();
      const total = calculateTotal(cart);
    
      let message = "Carrito de Compra:\n";
    
      cart.forEach(item => {
        const product = item.product;
        const quantity = item.quantity;
        const totalPrice = product.precio * quantity;
        message += `Id: ${product.id} - ${product.nombre} - Cantidad: ${quantity} - Precio Unitario:$${product.precio} - Precio Total: $${totalPrice}\n`;
      });
    
      message += `\nTotal de la compra: $${total}`;
    
      // Reemplaza el número de teléfono con el que deseas enviar el mensaje
      const phoneNumber = "529991749247";
    
      // Reemplaza "Su mensaje" con el mensaje que deseas enviar
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
      window.open(whatsappUrl);
    }
    
    function getCart() {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    }
    
    // Función para calcular el total de la compra
    function calculateTotal(cart) {
      let total = 0;
      cart.forEach(item => {
        const product = item.product;
        const quantity = item.quantity;
        total += product.precio * quantity;
      });
      return total;
    }
    
    // Función para obtener el total de la compra
    function getTotalPrice() {
        let total = 0;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const product = item;
            const quantity = item.quantity;
            total += product.precio * quantity;
        });
        return `$${formatNumberWithCommas(total)}`;
    }
    
    // Función para dividir números por miles con coma
    function formatNumberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Cargar el carrito al cargar la página
    window.onload = function () {
        loadCart();
    };
    
    inicio.addEventListener("click", function() {
        window.location.href = "index.html";
      });
    
      function goToCart() {
        window.location.href = 'cart.html';
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
    
    const btnrever = document.querySelector(".atras")
    
    btnrever.addEventListener("click",()=>{
      window.history.back();
    })
    
      updateCartCount();
    