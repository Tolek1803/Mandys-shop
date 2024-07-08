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
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
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

    window.addToCart = addToCart;

    renderProducts();
    updateCartCount();
});
