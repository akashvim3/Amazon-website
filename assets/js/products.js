/**
 * Products Page JavaScript
 * Handles product listing, filtering, and sorting
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    if (typeof Cart !== 'undefined') {
        Cart.init();
    }

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');

    // Update page title
    const pageTitle = document.getElementById('page-title');
    if (categoryParam) {
        pageTitle.textContent = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) + ' Products';
    } else if (searchParam) {
        pageTitle.textContent = 'Search Results for "' + searchParam + '"';
    }

    // Get products based on filters
    let products = Products.getAll();

    if (categoryParam) {
        products = Products.getByCategory(categoryParam);
    }

    if (searchParam) {
        products = Products.search(searchParam);
    }

    // Render products
    renderProducts(products);

    // Setup filters
    setupFilters();

    // Setup sort
    setupSort(products);
});

// Render products to the grid
function renderProducts(products) {
    const grid = document.getElementById('products-grid');

    if (products.length === 0) {
        grid.innerHTML = '<div class="no-products"><p>No products found matching your criteria.</p></div>';
        return;
    }

    grid.innerHTML = products.map(product => createProductCard(product)).join('');

    // Add click handlers to add to cart buttons
    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.id;
            const product = Products.getById(productId);
            if (product && Cart) {
                Cart.addItem(product);
            }
        });
    });
}

// Create product card HTML
function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');

    return `
        <div class="product-card">
            <a href="#" class="product-link">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="review-count">${product.reviews.toLocaleString()}</span>
                    </div>
                    <p class="product-price">$${product.price}</p>
                    <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                </div>
            </a>
        </div>
    `;
}

// Setup filter functionality
function setupFilters() {
    const checkboxes = document.querySelectorAll('.filter-list input[type="checkbox"]');
    const radioButtons = document.querySelectorAll('.filter-list input[type="radio"]');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });

    radioButtons.forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
}

// Apply all filters
function applyFilters() {
    let products = Products.getAll();

    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('.filter-list input[type="checkbox"]:checked'))
        .map(cb => cb.value);

    if (selectedCategories.length > 0) {
        products = products.filter(product => selectedCategories.includes(product.category));
    }

    // Get selected price range
    const selectedPrice = document.querySelector('.filter-list input[type="radio"]:checked');
    if (selectedPrice) {
        const priceRange = selectedPrice.value;
        products = products.filter(product => {
            switch (priceRange) {
                case '0-100': return product.price < 100;
                case '100-250': return product.price >= 100 && product.price <= 250;
                case '250-500': return product.price >= 250 && product.price <= 500;
                case '500-1000': return product.price >= 500 && product.price <= 1000;
                case '1000+': return product.price > 1000;
                default: return true;
            }
        });
    }

    renderProducts(products);
}

// Setup sort functionality
function setupSort(initialProducts) {
    const sortSelect = document.getElementById('sort');

    sortSelect.addEventListener('change', () => {
        let products = Products.getAll();

        // Re-apply category filter if present
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            products = Products.getByCategory(categoryParam);
        }

        const sortValue = sortSelect.value;

        switch (sortValue) {
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // For demo, reverse the array
                products.reverse();
                break;
        }

        renderProducts(products);
    });
}

// Add product-specific styles
const productStyles = document.createElement('style');
productStyles.textContent = `
    .products-main {
        display: flex;
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px;
        gap: 30px;
    }
    
    .filters-sidebar {
        width: 250px;
        flex-shrink: 0;
    }
    
    .filter-section {
        margin-bottom: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e7e7e7;
    }
    
    .filter-section:last-child {
        border-bottom: none;
    }
    
    .filter-section h3 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 15px;
        color: #0f1111;
    }
    
    .filter-list {
        list-style: none;
    }
    
    .filter-list li {
        margin-bottom: 10px;
    }
    
    .filter-list label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 0.9rem;
        color: #0f1111;
    }
    
    .filter-list input[type="checkbox"],
    .filter-list input[type="radio"] {
        accent-color: #0071e3;
        width: 16px;
        height: 16px;
    }
    
    .products-section {
        flex: 1;
    }
    
    .products-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e7e7e7;
    }
    
    .products-header h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #0f1111;
    }
    
    .sort-options {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .sort-options label {
        font-size: 0.9rem;
        color: #666;
    }
    
    .sort-options select {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 0.9rem;
        cursor: pointer;
    }
    
    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 20px;
    }
    
    .product-card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        overflow: hidden;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    }
    
    .product-link {
        text-decoration: none;
        color: inherit;
    }
    
    .product-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    
    .product-info {
        padding: 15px;
    }
    
    .product-title {
        font-size: 0.95rem;
        font-weight: 500;
        margin-bottom: 8px;
        color: #0f1111;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .product-rating {
        display: flex;
        align-items: center;
        gap: 5px;
        margin-bottom: 8px;
    }
    
    .stars {
        color: #de7921;
        font-size: 0.9rem;
    }
    
    .review-count {
        color: #007185;
        font-size: 0.85rem;
    }
    
    .product-price {
        font-size: 1.2rem;
        font-weight: 600;
        color: #b12704;
        margin-bottom: 12px;
    }
    
    .add-to-cart-btn {
        width: 100%;
        padding: 10px;
        background: #f7ca00;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .add-to-cart-btn:hover {
        background: #f2c200;
    }
    
    .no-products {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
        color: #666;
    }
    
    @media (max-width: 768px) {
        .products-main {
            flex-direction: column;
        }
        
        .filters-sidebar {
            width: 100%;
        }
        
        .products-header {
            flex-direction: column;
            gap: 15px;
            align-items: flex-start;
        }
    }
`;
document.head.appendChild(productStyles);
