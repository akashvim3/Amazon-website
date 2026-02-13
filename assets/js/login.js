/**
 * Login Page JavaScript
 * Handles login form validation and submission
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const createAccountBtn = document.getElementById('create-account-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (createAccountBtn) {
        createAccountBtn.addEventListener('click', () => {
            alert('This is a demo. In a real application, you would be redirected to the account creation page.');
        });
    }
});

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');

    // Validate email
    if (!isValidEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
        return;
    }

    emailError.style.display = 'none';

    // Simulate login (in a real app, this would make an API call)
    const submitBtn = e.target.querySelector('.continue-btn');
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Store demo user session
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');

        alert('Demo: Login successful! Redirecting to home page...');
        window.location.href = 'index.html';
    }, 1500);
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add login-specific styles
const loginStyles = document.createElement('style');
loginStyles.textContent = `
    .login-page {
        background: #fff;
        min-height: 100vh;
    }
    
    .login-header {
        background: #0f1111;
        padding: 15px 20px;
        display: flex;
        justify-content: center;
    }
    
    .login-header .nav-logo img {
        width: 120px;
    }
    
    .login-main {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 40px 20px;
        gap: 60px;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .login-container {
        width: 350px;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 8px;
    }
    
    .login-container h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #0f1111;
        margin-bottom: 25px;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        font-size: 0.9rem;
        font-weight: 600;
        color: #0f1111;
        margin-bottom: 8px;
    }
    
    .form-group input {
        width: 100%;
        padding: 12px;
        border: 1px solid #a6a6a6;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus {
        outline: none;
        border-color: #e77600;
        box-shadow: 0 0 3px 2px rgba(228, 165, 0, 0.5);
    }
    
    .error-message {
        color: #c40000;
        font-size: 0.85rem;
        margin-top: 5px;
        display: none;
    }
    
    .continue-btn {
        width: 100%;
        padding: 10px;
        background: #f7ca00;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .continue-btn:hover {
        background: #f2c200;
    }
    
    .continue-btn:disabled {
        background: #ddd;
        cursor: not-allowed;
    }
    
    .conditions {
        font-size: 0.85rem;
        color: #666;
        margin-top: 20px;
        line-height: 1.5;
    }
    
    .conditions a {
        color: #0066c0;
    }
    
    .conditions a:hover {
        text-decoration: underline;
    }
    
    .divider {
        display: flex;
        align-items: center;
        margin: 25px 0;
    }
    
    .divider::before,
    .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #ddd;
    }
    
    .divider span {
        padding: 0 10px;
        font-size: 0.85rem;
        color: #666;
    }
    
    .create-account-btn {
        width: 100%;
        padding: 10px;
        background: linear-gradient(to bottom, #f7f8fa, #e7e9ec);
        border: 1px solid #a6a6a6;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .create-account-btn:hover {
        background: linear-gradient(to bottom, #e7eaf0, #d9dce1);
    }
    
    .login-help {
        margin-top: 20px;
        text-align: center;
    }
    
    .login-help a {
        font-size: 0.85rem;
        color: #0066c0;
    }
    
    .login-divider {
        width: 1px;
        height: 400px;
        background: #ddd;
    }
    
    .benefits-section {
        width: 400px;
    }
    
    .benefits-section h2 {
        font-size: 1.3rem;
        font-weight: 600;
        color: #0f1111;
        margin-bottom: 25px;
    }
    
    .benefits-list {
        list-style: none;
    }
    
    .benefits-list li {
        display: flex;
        gap: 15px;
        margin-bottom: 25px;
    }
    
    .benefits-list .material-symbols-outlined {
        font-size: 2.5rem;
        color: #febd68;
    }
    
    .benefits-list h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #0f1111;
        margin-bottom: 5px;
    }
    
    .benefits-list p {
        font-size: 0.9rem;
        color: #666;
    }
    
    .login-footer {
        background: #fff;
        padding: 30px 20px;
        text-align: center;
        border-top: 1px solid #ddd;
        margin-top: 40px;
    }
    
    .footer-links {
        margin-bottom: 15px;
    }
    
    .footer-links a {
        color: #0066c0;
        font-size: 0.85rem;
        margin: 0 10px;
    }
    
    .footer-links a:hover {
        text-decoration: underline;
    }
    
    .login-footer p {
        font-size: 0.85rem;
        color: #666;
    }
    
    @media (max-width: 900px) {
        .login-main {
            flex-direction: column;
            align-items: center;
        }
        
        .login-divider {
            width: 100%;
            height: 1px;
            margin: 30px 0;
        }
        
        .benefits-section {
            width: 100%;
            max-width: 350px;
        }
    }
`;
document.head.appendChild(loginStyles);
