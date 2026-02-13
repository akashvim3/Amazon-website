/**
 * Cart Page JavaScript
 * Handles cart display and operations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    Cart.init();

    // Render cart items
    renderCart();

    // Setup checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
});

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmptyContainer = document.getElementById('cart-empty');
    const cartContainer = document.querySelector('.cart-container');

    if (Cart.items.length === 0) {
        cartContainer.style.display = 'none';
        cartEmptyContainer.style.display = 'flex';
        return;
    }

    cartContainer.style.display = 'flex';
    cartEmptyContainer.style.display = 'none';

    cartItemsContainer.innerHTML = Cart.items.map(item => createCartItem(item)).join('');

    // Add event listeners for quantity buttons
    cartItemsContainer.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = btn.dataset.id;
            const action = btn.dataset.action;
            const item = Cart.items.find(i => i.id === productId);

            if (item) {
                if (action === 'increase') {
                    Cart.updateQuantity(productId, item.quantity + 1);
                } else if (action === 'decrease') {
                    if (item.quantity > 1) {
                        Cart.updateQuantity(productId, item.quantity - 1);
                    }
                }
                renderCart();
            }
        });
    });

    // Add event listeners for remove buttons
    cartItemsContainer.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.id;
            Cart.removeItem(productId);
            renderCart();
            Cart.showNotification('Item removed from cart');
        });
    });

    // Update summary
    updateSummary();
}

// Create cart item HTML
function createCartItem(item) {
    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3 class="item-title"><a href="#">${item.name}</a></h3>
                <p class="item-price">$${item.price}</p>
                <p class="item-availability">In Stock</p>
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}" data-action="decrease">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}" data-action="increase">+</button>
                    </div>
                    <span class="separator">|</span>
                    <button class="remove-btn" data-id="${item.id}">Delete</button>
                </div>
            </div>
            <div class="item-subtotal">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `;
}

// Update order summary
function updateSummary() {
    const subtotal = Cart.getTotal();
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    document.getElementById('item-count').textContent = Cart.items.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
    document.getElementById('tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Handle checkout
function handleCheckout() {
    if (Cart.items.length === 0) {
        Cart.showNotification('Your cart is empty!');
        return;
    }

    // In a real app, this would redirect to checkout
    Cart.showNotification('Redirecting to checkout...');

    setTimeout(() => {
        alert('This is a demo. In a real application, you would be redirected to the checkout page.');
    }, 1000);
}

// Add cart-specific styles
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .cart-main {
        max-width: 1400px;
        margin: 0 auto;
        padding: 30px 20px;
    }
    
    .cart-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #0f1111;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e7e7e7;
    }
    
    .cart-container {
        display: flex;
        gap: 30px;
    }
    
    .cart-items {
        flex: 1;
    }
    
    .cart-item {
        display: flex;
        gap: 20px;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-bottom: 15px;
    }
    
    .item-image {
        width: 150px;
        flex-shrink: 0;
    }
    
    .item-image img {
        width: 100%;
        height: 150px;
        object-fit: contain;
    }
    
    .item-details {
        flex: 1;
    }
    
    .item-title {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 8px;
    }
    
    .item-title a {
        color: #0f1111;
        text-decoration: none;
    }
    
    .item-title a:hover {
        color: #c7511f;
    }
    
    .item-price {
        font-size: 1.1rem;
        font-weight: 600;
        color: #b12704;
        margin-bottom: 5px;
    }
    
    .item-availability {
        font-size: 0.85rem;
        color: #007600;
        margin-bottom: 15px;
    }
    
    .item-actions {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .quantity-control {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #f7f8f8;
        border-radius: 4px;
        padding: 5px;
    }
    
    .quantity-btn {
        width: 30px;
        height: 30px;
        border: 1px solid #d5d9d9;
        background: #f7f8f8;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.2s ease;
    }
    
    .quantity-btn:hover {
        background: #e7e9e9;
    }
    
    .quantity {
        font-size: 0.9rem;
        min-width: 30px;
        text-align: center;
    }
    
    .separator {
        color: #ddd;
    }
    
    .remove-btn {
        background: none;
        border: none;
        color: #007185;
        cursor: pointer;
        font-size: 0.9rem;
    }
    
    .remove-btn:hover {
        text-decoration: underline;
        color: #c7511f;
    }
    
    .item-subtotal {
        font-size: 1.2rem;
        font-weight: 600;
        color: #0f1111;
        min-width: 100px;
        text-align: right;
    }
    
    .cart-summary {
        width: 350px;
        flex-shrink: 0;
    }
    
    .summary-card {
        background: #fff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 80px;
    }
    
    .summary-card h2 {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 15px;
        color: #0f1111;
        padding-bottom: 15px;
        border-bottom: 1px solid #e7e7e7;
    }
    
    .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 0.95rem;
        color: #0f1111;
    }
    
    .summary-row.total {
        font-size: 1.2rem;
        font-weight: 600;
        border-top: 1px solid #e7e7e7;
        padding-top: 15px;
        margin-top: 15px;
    }
    
    .checkout-btn {
        width: 100%;
        padding: 12px;
        background: #f7ca00;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 15px;
        transition: background-color 0.3s ease;
    }
    
    .checkout-btn:hover {
        background: #f2c200;
    }
    
    .continue-shopping {
        display: block;
        text-align: center;
        margin-top: 15px;
        color: #007185;
        font-size: 0.9rem;
    }
    
    .continue-shopping:hover {
        color: #c7511f;
    }
    
    .cart-empty {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
    }
    
    .empty-cart-content {
        text-align: center;
    }
    
    .empty-icon {
        font-size: 5rem;
        color: #ddd;
        margin-bottom: 20px;
    }
    
    .empty-cart-content h2 {
        font-size: 1.5rem;
        color: #0f1111;
        margin-bottom: 10px;
    }
    
    .empty-cart-content p {
        color: #666;
        margin-bottom: 20px;
    }
    
    .shop-now-btn {
        display: inline-block;
        padding: 12px 30px;
        background: #0071e3;
        color: #fff;
        border-radius: 4px;
        font-weight: 600;
        transition: background-color 0.3s ease;
    }
    
    .shop-now-btn:hover {
        background: #005bb5;
        text-decoration: none;
    }
    
    @media (max-width: 900px) {
        .cart-container {
            flex-direction: column;
        }
        
        .cart-summary {
            width: 100%;
        }
        
        .summary-card {
            position: static;
        }
    }
    
    @media (max-width: 600px) {
        .cart-item {
            flex-direction: column;
        }
        
        .item-image {
            width: 100%;
        }
        
        .item-image img {
            height: 200px;
        }
        
        .item-subtotal {
            text-align: left;
            margin-top: 10px;
        }
    }
`;
document.head.appendChild(cartStyles);
