/**
 * Amazon Clone - Main JavaScript
 * Handles interactive functionality for the website
 */

// Cart functionality
const Cart = {
    items: [],

    init() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    },

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
        this.updateCartCount();
        this.showNotification('Added to cart!');
    },

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateCartCount();
    },

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.save();
            this.updateCartCount();
        }
    },

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('#cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
        });
    },

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #232f3e;
            color: #fff;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
};

// Search functionality
const Search = {
    init() {
        const searchInput = document.querySelector('.search-input');
        const searchIcon = document.querySelector('.search-icon');

        if (searchInput && searchIcon) {
            searchIcon.addEventListener('click', () => this.performSearch());
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
        }
    },

    performSearch() {
        const searchInput = document.querySelector('.search-input');
        const query = searchInput ? searchInput.value.trim() : '';

        if (query) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    }
};

// Smooth scroll for anchor links
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
};

// Back to top functionality
const BackToTop = {
    init() {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
};

// Product data for demo
const Products = {
    data: [
        {
            id: 1,
            name: 'Apple MacBook Pro 14"',
            category: 'laptops',
            price: 1999,
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
            rating: 4.8,
            reviews: 1250
        },
        {
            id: 2,
            name: 'Samsung Galaxy Watch 5',
            category: 'smartwatches',
            price: 299,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
            rating: 4.5,
            reviews: 890
        },
        {
            id: 3,
            name: 'Philips Hue LED Strip',
            category: 'lighting',
            price: 79,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            rating: 4.3,
            reviews: 456
        },
        {
            id: 4,
            name: 'Modern Sofa Set',
            category: 'home',
            price: 899,
            image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=400',
            rating: 4.6,
            reviews: 234
        },
        {
            id: 5,
            name: 'Sony WH-1000XM5 Headphones',
            category: 'audio',
            price: 349,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            rating: 4.7,
            reviews: 2100
        },
        {
            id: 6,
            name: 'Canon EOS R6 Camera',
            category: 'cameras',
            price: 2499,
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
            rating: 4.9,
            reviews: 567
        },
        {
            id: 7,
            name: 'PlayStation 5 Console',
            category: 'gaming',
            price: 499,
            image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400',
            rating: 4.8,
            reviews: 3450
        },
        {
            id: 8,
            name: 'Fitbit Charge 5',
            category: 'wearables',
            price: 149,
            image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400',
            rating: 4.4,
            reviews: 1890
        }
    ],

    getAll() {
        return this.data;
    },

    getByCategory(category) {
        return this.data.filter(product => product.category === category);
    },

    getById(id) {
        return this.data.find(product => product.id === parseInt(id));
    },

    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.data.filter(product =>
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    Search.init();
    SmoothScroll.init();
    BackToTop.init();

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Export for use in other files
window.AmazonClone = {
    Cart,
    Products
};
