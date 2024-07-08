document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            name: 'Armbandje 1',
            description: 'Een prachtig armbandje.',
            price: 10.00,
            image: 'images/product1.jpg'
        },
        {
            id: 2,
            name: 'Armbandje 2',
            description: 'Een prachtig armbandje.',
            price: 15.00,
            image: 'images/product2.jpg'
        }
        // Voeg meer producten toe als je wilt
    ];

    const productsContainer = document.getElementById('products');
    const cartCount = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart-container');
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    };

    const removeFromCart = (productId) => {
        cart = cart.filter(product => product.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    };

    const renderProducts = () => {
        productsContainer.innerHTML = products.map(product => `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>€${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Toevoegen aan winkelwagen</button>
            </div>
        `).join('');
    };

    const renderCartItems = () => {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Je winkelwagen is leeg.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(product => `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h2>${product.name}</h2>
                        <p>€${product.price.toFixed(2)}</p>
                        <button onclick="removeFromCart(${product.id})">Verwijderen</button>
                    </div>
                </div>
            `).join('');
        }
    };

    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;

    renderProducts();
    updateCartCount();
    renderCartItems();
});
