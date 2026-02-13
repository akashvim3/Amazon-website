# Amazon Clone Website

A professional e-commerce website clone built with HTML, CSS, and JavaScript. This project replicates the core functionality and design of Amazon's shopping experience.

![Amazon Clone](https://images.unsplash.com/photo-1557821552-17105176677c?w=800)

## Features

### Core Features
- **Homepage**: Hero section, featured products, categories, and deals section
- **Product Listing**: Browse products by category with filtering and sorting options
- **Shopping Cart**: Add/remove items, update quantities, view order summary
- **User Authentication**: Login/signup page with form validation
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Technical Features
- Clean, semantic HTML5 markup
- CSS3 with Flexbox and Grid layouts
- Vanilla JavaScript (no frameworks)
- Local storage for cart persistence
- Smooth animations and transitions
- SEO-friendly structure
- Accessible markup with ARIA labels

## Project Structure

```
amazon-clone/
├── index.html          # Homepage
├── products.html       # Products listing page
├── cart.html          # Shopping cart page
├── login.html         # User login page
├── README.md          # Project documentation
├── LICENSE            # MIT License
└── assets/
    ├── css/
    │   └── styles.css  # Main stylesheet
    ├── js/
    │   ├── main.js     # Core JavaScript functions
    │   ├── products.js # Products page functionality
    │   ├── cart.js     # Cart page functionality
    │   └── login.js    # Login page functionality
    └── images/
        ├── amazon_logo.png
        ├── hero-img.jpg
        ├── img-1.png
        ├── img-2.png
        ├── img-3.png
        └── img-4.png
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)

### Installation

1. Clone or download the project:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd amazon-clone
```

3. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

Or simply drag and drop the `index.html` file into your browser.

## Pages Overview

### Homepage (`index.html`)
- Navigation bar with search, account, and cart
- Banner section with quick links
- Hero section with call-to-action
- Featured products grid
- Categories section
- Deal of the day section
- Footer with links

### Products Page (`products.html`)
- Sidebar with filters (category, price, rating)
- Sort options (price, rating, newest)
- Product grid with cards
- Add to cart functionality

### Cart Page (`cart.html`)
- List of added items
- Quantity controls (+/-)
- Remove item option
- Order summary with subtotal, shipping, tax
- Checkout button

### Login Page (`login.html`)
- Email/phone input with validation
- "Continue" button
- Create account option
- Benefits section

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Styling, animations, responsive design
- **JavaScript (ES6+)**: Interactivity and functionality
- **Google Fonts**: Open Sans font family
- **Google Material Symbols**: Icons
- **Unsplash**: High-quality images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Changing Colors
Edit the `:root` variables in `assets/css/styles.css`:

```css
:root {
    --primary-color: #febd68;
    --secondary-color: #232f3e;
    --accent-color: #0071e3;
}
```

### Adding Products
Edit the `Products.data` array in `assets/js/main.js`:

```javascript
{
    id: 9,
    name: 'New Product',
    category: 'category-name',
    price: 99.99,
    image: 'https://image-url.com/product.jpg',
    rating: 4.5,
    reviews: 100
}
```

## Scripts

### Core Functions
- `Cart.init()` - Initialize cart from local storage
- `Cart.addItem(product)` - Add item to cart
- `Cart.removeItem(id)` - Remove item from cart
- `Cart.updateQuantity(id, quantity)` - Update item quantity
- `Cart.getTotal()` - Calculate cart total
- `Products.getAll()` - Get all products
- `Products.getByCategory(category)` - Filter by category
- `Products.search(query)` - Search products

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Amazon](https://www.amazon.com) for the original design inspiration
- [Unsplash](https://unsplash.com) for the beautiful product images
- [Google Fonts](https://fonts.google.com) for the typography
- [Google Material Icons](https://fonts.google.com/icons) for the icons

## Contact

Created by [Akash Vimal](https://github.com/yourusername)

---

**Note**: This is a frontend demo project for educational purposes. It does not include backend functionality, payment processing, or real user accounts.
