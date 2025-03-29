// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true
});

// Sample product data
const products = [
    {
        id: 1,
        name: "Sony WH-1000XM4 Headphones",
        price: 349.99,
        category: "electronics",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Industry-leading noise canceling with Dual Noise Sensor technology, 30-hour battery life, and multipoint pairing capability."
    },
    {
        id: 2,
        name: "Apple Watch Series 7",
        price: 399.99,
        category: "electronics",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Always-On Retina display, ECG monitoring, Blood Oxygen tracking, and advanced workout metrics."
    },
    {
        id: 3,
        name: "Nike Air Max 270",
        price: 150.00,
        category: "clothing",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Iconic design with large Air unit in heel, breathable mesh upper, and comfortable foam midsole."
    },
    {
        id: 4,
        name: "MacBook Pro M1",
        price: 1299.99,
        category: "electronics",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Apple M1 chip, 13-inch Retina display, up to 20 hours battery life, and Magic Keyboard."
    },
    {
        id: 5,
        name: "Levi's 501 Original Jeans",
        price: 69.99,
        category: "clothing",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Classic straight fit jeans with signature button fly and authentic denim look."
    },
    {
        id: 6,
        name: "PlayStation 5",
        price: 499.99,
        category: "electronics",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Next-gen gaming console with 4K graphics, ray tracing, and ultra-high speed SSD."
    },
    {
        id: 7,
        name: "Ray-Ban Aviator",
        price: 154.99,
        category: "clothing",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Classic aviator sunglasses with gold frame and polarized lenses."
    },
    {
        id: 8,
        name: "iPhone 13 Pro",
        price: 999.99,
        category: "electronics",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        description: "Pro camera system, Super Retina XDR display with ProMotion, and A15 Bionic chip."
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const productModal = new bootstrap.Modal(document.getElementById('productModal'));
const sortDropdown = document.getElementById('sortDropdown');

// Initialize the page
function init() {
    displayProducts(products);
    setupEventListeners();
    setupSmoothScroll();
    setupNewsletterForm();
}

// Setup smooth scrolling for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup newsletter form
function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if (email) {
                showToast('Thank you for subscribing!');
                form.reset();
            }
        });
    }
}

// Display products in the grid
function displayProducts(productsToShow) {
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.setAttribute('data-aos', 'fade-up');
    
    col.innerHTML = `
        <div class="card product-card" data-product-id="${product.id}">
            <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title product-title">${product.name}</h5>
                <p class="card-text product-price">$${product.price.toFixed(2)}</p>
                <div class="product-rating">
                    ${createStarRating(product.rating)}
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Setup event listeners
function setupEventListeners() {
    // Price range slider
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            if (priceValue) {
                priceValue.textContent = `$${e.target.value}`;
            }
            filterProducts();
        });
    }

    // Category checkboxes
    document.querySelectorAll('.form-check-input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    // Sort dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sortBy = e.target.dataset.sort;
            sortProducts(sortBy);
        });
    });

    // Product card click
    if (productGrid) {
        productGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                const productId = parseInt(card.dataset.productId);
                const product = products.find(p => p.id === productId);
                if (product) {
                    showProductDetails(product);
                }
            }
        });
    }

    // Quick view buttons
    document.querySelectorAll('.featured-overlay .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = e.target.closest('.featured-card');
            if (card) {
                const productId = parseInt(card.dataset.productId);
                const product = products.find(p => p.id === productId);
                if (product) {
                    showProductDetails(product);
                }
            }
        });
    });
}

// Filter products based on selected criteria
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('.form-check-input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
    const maxPrice = parseInt(priceRange ? priceRange.value : 1000);
    
    let filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const priceMatch = product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    displayProducts(sortedProducts);
}

// Show product details in modal
function showProductDetails(product) {
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${product.image}" class="img-fluid" alt="${product.name}">
                </div>
                <div class="col-md-6">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <div class="product-rating mb-3">
                        ${createStarRating(product.rating)}
                    </div>
                    <p>${product.description}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productModal.show();
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showToast('Product added to cart!');
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.badge');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast position-fixed bottom-0 end-0 m-3';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Notification</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    document.body.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Navbar Functionality
function setupNavbar() {
    // Search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchQuery = searchForm.querySelector('input').value;
            if (searchQuery.trim()) {
                searchProducts(searchQuery);
            }
        });
    }

    // Cart functionality
    setupCart();
}

// Search products
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
    showToast(`Found ${filteredProducts.length} products`);
}

// Setup cart functionality
function setupCart() {
    const cartOffcanvas = document.getElementById('cartOffcanvas');
    if (cartOffcanvas) {
        cartOffcanvas.addEventListener('show.bs.offcanvas', updateCartDisplay);
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartSubtotal = document.querySelector('.cart-subtotal');
    const cartTotal = document.querySelector('.cart-total');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Your cart is empty</p>
            </div>
        `;
        cartSubtotal.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item d-flex align-items-center mb-3 p-2 border-bottom">
            <img src="${item.image}" alt="${item.name}" class="me-3" style="width: 60px; height: 60px; object-fit: cover;">
            <div class="flex-grow-1">
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">$${item.price.toFixed(2)}</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update totals
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartCount();
        updateCartDisplay();
        showToast('Item removed from cart');
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupNavbar();
});

// Product Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('productGrid');
    const filterInputs = document.querySelectorAll('.form-check-input');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const sortDropdown = document.getElementById('sortDropdown');

    // Function to filter products
    function filterProducts() {
        const selectedPrices = Array.from(document.querySelectorAll('.price-ranges input:checked')).map(input => input.value);
        const selectedDiscounts = Array.from(document.querySelectorAll('.discount-ranges input:checked')).map(input => input.value);
        const selectedRatings = Array.from(document.querySelectorAll('.rating-filters input:checked')).map(input => input.value);
        const selectedBrands = Array.from(document.querySelectorAll('.brand-filters input:checked')).map(input => input.value);
        const selectedStock = Array.from(document.querySelectorAll('input[value="in-stock"]:checked, input[value="out-of-stock"]:checked')).map(input => input.value);

        const products = Array.from(productGrid.children);

        products.forEach(product => {
            const price = parseFloat(product.dataset.price);
            const rating = parseFloat(product.dataset.rating);
            const brand = product.dataset.brand;
            const stock = product.dataset.stock;

            // Price filter
            const priceMatch = selectedPrices.length === 0 || selectedPrices.some(range => {
                const [min, max] = range.split('-').map(Number);
                return max ? (price >= min && price <= max) : (price >= min);
            });

            // Rating filter
            const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(r => rating >= parseFloat(r));

            // Brand filter
            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(brand);

            // Stock filter
            const stockMatch = selectedStock.length === 0 || selectedStock.includes(stock);

            // Show/hide product based on filters
            if (priceMatch && ratingMatch && brandMatch && stockMatch) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });

        // Show "No products found" message if all products are hidden
        const visibleProducts = products.filter(product => product.style.display !== 'none');
        if (visibleProducts.length === 0) {
            const noProductsMessage = document.createElement('div');
            noProductsMessage.className = 'col-12 text-center py-5';
            noProductsMessage.innerHTML = `
                <i class="fas fa-search fa-3x mb-3 text-muted"></i>
                <h4>No products found</h4>
                <p class="text-muted">Try adjusting your filters to find what you're looking for.</p>
            `;
            productGrid.appendChild(noProductsMessage);
        } else {
            const existingMessage = productGrid.querySelector('.col-12.text-center');
            if (existingMessage) {
                existingMessage.remove();
            }
        }
    }

    // Function to sort products
    function sortProducts(sortBy) {
        const products = Array.from(productGrid.children).filter(product => product.style.display !== 'none');
        const sortedProducts = products.sort((a, b) => {
            switch(sortBy) {
                case 'price-asc':
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                case 'price-desc':
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                case 'rating':
                    return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
                default:
                    return 0;
            }
        });

        // Clear and re-append sorted products
        productGrid.innerHTML = '';
        sortedProducts.forEach(product => productGrid.appendChild(product));
    }

    // Event Listeners
    filterInputs.forEach(input => {
        input.addEventListener('change', filterProducts);
    });

    clearFiltersBtn.addEventListener('click', () => {
        filterInputs.forEach(input => input.checked = false);
        filterProducts();
    });

    // Sort dropdown functionality
    document.querySelectorAll('#sortDropdown + .dropdown-menu .dropdown-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sortBy = e.target.dataset.sort;
            sortProducts(sortBy);
            document.getElementById('sortDropdown').textContent = e.target.textContent;
        });
    });

    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.featured-overlay .btn');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));

    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.featured-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const productImage = productCard.querySelector('img').src;
            const productRating = productCard.querySelector('.rating-count').textContent;

            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-6">
                        <img src="${productImage}" class="img-fluid rounded" alt="${productTitle}">
                    </div>
                    <div class="col-md-6">
                        <h4>${productTitle}</h4>
                        <div class="price-box mb-3">
                            <p class="price">$${productPrice}</p>
                        </div>
                        <div class="rating mb-3">
                            ${productCard.querySelector('.rating').innerHTML}
                        </div>
                        <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <button class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            `;

            productModal.show();
        });
    });
}); 