// Product Details
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        description: "High-quality wireless sound experience.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2299,
        description: "Track your fitness and daily activities.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1899,
        description: "Comfortable shoes for everyday use.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 4,
        name: "Backpack",
        category: "Accessories",
        price: 999,
        description: "Stylish backpack for college and travel.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        id: 5,
        name: "Sunglasses",
        category: "Accessories",
        price: 799,
        description: "Modern sunglasses with a stylish look.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },
    {
        id: 6,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 599,
        description: "Soft and comfortable everyday clothing.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        id: 7,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1299,
        description: "Enjoy clear sound wherever you go.",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500"
    },
    {
        id: 8,
        name: "Leather Wallet",
        category: "Accessories",
        price: 699,
        description: "A simple and elegant everyday wallet.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500"
    }
];

// Shopping Cart
let cart = [];

// Display Products
function displayProducts(productList) {
    const productContainer = document.getElementById("product-list");

    if (!productContainer) return;

    if (productList.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    productContainer.innerHTML = productList.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">₹${product.price.toLocaleString("en-IN")}</div>
                <button class="add-cart-btn" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join("");
}

// Add Product to Cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}

// Remove Product from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Change Product Quantity
function changeQuantity(productId, change) {
    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// Update Shopping Cart
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cartTotal) {
        cartTotal.textContent = totalPrice.toLocaleString("en-IN");
    }

    if (cartContainer) {
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is currently empty.</p>";
        } else {
            cartContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong>
                        <p>₹${item.price.toLocaleString("en-IN")} × ${item.quantity}</p>
                    </div>

                    <div>
                        <button class="remove-btn"
                            onclick="changeQuantity(${item.id}, -1)">−</button>

                        <span>${item.quantity}</span>

                        <button class="remove-btn"
                            onclick="changeQuantity(${item.id}, 1)">+</button>

                        <button class="remove-btn"
                            onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            `).join("");
        }
    }
}

// Search Products
const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const searchText = this.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText)
        );

        displayProducts(filteredProducts);
    });
}

// Filter Products by Category
document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", function () {
        const category = this.dataset.category;

        document.querySelectorAll(".category-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        if (searchInput) {
            searchInput.value = "";
        }

        const filteredProducts = category === "All"
            ? products
            : products.filter(product => product.category === category);

        displayProducts(filteredProducts);
    });
});

// Cart Button
const cartBtn = document.getElementById("cartBtn");

if (cartBtn) {
    cartBtn.addEventListener("click", function () {
        document.getElementById("cart").scrollIntoView({
            behavior: "smooth"
        });
    });
}

// Login Button
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        alert("Login and Registration will be available soon!");
    });
}

// Checkout Button
const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your shopping cart is empty!");
            return;
        }

        alert("Checkout and order placement will be connected soon!");
    });
}

// Initialize Website
displayProducts(products);
updateCart();
