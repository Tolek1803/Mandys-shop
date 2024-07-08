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
        },
        {
            id: 3,
            name: 'Armbandje 3',
            description: 'Een prachtig armbandje.',
            price: 20.00,
            image: 'images/product3.jpg'
        },
        {
            id: 4,
            name: 'Armbandje 4',
            description: 'Een prachtig armbandje.',
            price: 25.00,
            image: 'images/product4.jpg'
        }
    ];

    const productsContainer = document.getElementById('products');
    const cartCount = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartModal = document.getElementById('cart-modal');
    const closeModalButton = document.querySelector('.close');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        cart.push({...product, cartId: Date.now()});
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    };

    const removeFromCart = (cartId) => {
        cart = cart.filter(item => item.cartId !== cartId);
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
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h2>${item.name}</h2>
                        <p>€${item.price.toFixed(2)}</p>
                        <button onclick="removeFromCart(${item.cartId})">Verwijderen</button>
                    </div>
                </div>
            `).join('');
        }
    };

    const toggleCartModal = () => {
        cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
    };

    document.getElementById('view-cart').addEventListener('click', (e) => {
        e.preventDefault();
        toggleCartModal();
    });

    closeModalButton.addEventListener('click', toggleCartModal);
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            toggleCartModal();
        }
    });

    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;

    renderProducts();
    updateCartCount();
    renderCartItems();
});
