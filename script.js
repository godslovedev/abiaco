// Get elements
const navLinks = document.querySelectorAll('nav ul li a');
const registerLink = document.querySelector('nav ul li:nth-child(2) a');
const loginLink = document.querySelector('nav ul li:nth-child(3) a');

// Add event listeners
registerLink.addEventListener('click', () => {
    // Register functionality will go here
    console.log('Register link clicked');
});

loginLink.addEventListener('click', () => {
    // Login functionality will go here
    console.log('Login link clicked');
});

// LocalStorage setup
const storage = window.localStorage;

// Function to save data to LocalStorage
const saveData = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
};

// Function to retrieve data from LocalStorage
const getData = (key) => {
    return JSON.parse(storage.getItem(key));
};

// Registration functionality
const registerForm = document.createElement('form');
registerForm.innerHTML = `
    <h2>Register</h2>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username"><br><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password"><br><br>
    <button id="register-btn">Register</button>
`;

const registerBtn = registerForm.querySelector('#register-btn');
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('#username').value;
    const password = registerForm.querySelector('#password').value;
    const user = { username, password };
    saveData('user', user);
    console.log('User registered successfully!');
});

// Login functionality
const loginForm = document.createElement('form');
loginForm.innerHTML = `
    <h2>Login</h2>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username"><br><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password"><br><br>
    <button id="login-btn">Login</button>
`;

const loginBtn = loginForm.querySelector('#login-btn');
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('#username').value;
    const password = loginForm.querySelector('#password').value;
    const storedUser = getData('user');
    if (storedUser && storedUser.username === username && storedUser.password === password) {
        console.log('User logged in successfully!');
    } else {
        console.log('Invalid username or password!');
    }
});

// Display registration and login forms
registerLink.addEventListener('click', () => {
    document.body.appendChild(registerForm);
});

loginLink.addEventListener('click', () => {
    document.body.appendChild(loginForm);
});

// script.js (updated)

// ... (previous code remains the same)

// User profile functionality
const userProfileForm = document.createElement('form');
userProfileForm.innerHTML = `
    <h2>User Profile</h2>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br><br>
    <button id="save-profile-btn">Save Profile</button>
`;

const saveProfileBtn = userProfileForm.querySelector('#save-profile-btn');
saveProfileBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = userProfileForm.querySelector('#name').value;
    const email = userProfileForm.querySelector('#email').value;
    const user = getData('user');
    user.name = name;
    user.email = email;
    saveData('user', user);
    console.log('User profile updated successfully!');
});

// Product posting functionality
const productForm = document.createElement('form');
productForm.innerHTML = `
    <h2>Post Product</h2>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title"><br><br>
    <label for="description">Description:</label>
    <textarea id="description" name="description"></textarea><br><br>
    <label for="price">Price:</label>
    <input type="number" id="price" name="price"><br><br>
    <button id="post-product-btn">Post Product</button>
`;

const postProductBtn = productForm.querySelector('#post-product-btn');
postProductBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = productForm.querySelector('#title').value;
    const description = productForm.querySelector('#description').value;
    const price = productForm.querySelector('#price').value;
    const product = { title, description, price };
    const products = getData('products') || [];
    products.push(product);
    saveData('products', products);
    console.log('Product posted successfully!');
});

// Display user profile and product posting forms
const userProfileLink = document.createElement('a');
userProfileLink.textContent = 'User Profile';
userProfileLink.addEventListener('click', () => {
    document.body.appendChild(userProfileForm);
});

const postProductLink = document.createElement('a');
postProductLink.textContent = 'Post Product';
postProductLink.addEventListener('click', () => {
    document.body.appendChild(productForm);
});

document.body.appendChild(userProfileLink);
document.body.appendChild(postProductLink);

// Product listing page
const productListingPage = document.createElement('div');
productListingPage.innerHTML = `
    <h2>Product Listings</h2>
    <ul id="product-listings"></ul>
`;

const productlistings = productListingPage.querySelector('#product-listings');
const products = getData('products') || [];
products.forEach((product) => {
    const productListItem = document.createElement('li');
    productListItem.innerHTML = `
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Price: ${product.price}</p>
        <button class="view-product-btn">View Product</button>
    `;
    productlistings.appendChild(productListItem);
});

// Product detail page
const productDetailPage = document.createElement('div');
productDetailPage.innerHTML = `
    <h2>Product Detail</h2>
    <div id="product-detail"></div>
`;

// View product button event listener
productlistings.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-product-btn')) {
        const productId = e.target.dataset.productId;
        const product = products.find((product) => product.id === productId);
        const productDetailHtml = `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
        `;
        productDetailPage.querySelector('#product-detail').innerHTML = productDetailHtml;
        document.body.appendChild(productDetailPage);
    }
});

// Display product listing page
const productListingLink = document.createElement('a');
productListingLink.textContent = 'Product Listings';
productListingLink.addEventListener('click', () => {
    document.body.appendChild(productListingPage);
});

// ... (previous code remains the same)

// Search functionality
const searchForm = document.createElement('form');
searchForm.innerHTML = `
    <input type="search" id="search-input" placeholder="Search products...">
    <button id="search-btn">Search</button>
`;

const searchInput = searchForm.querySelector('#search-input');
const searchBtn = searchForm.querySelector('#search-btn');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const products = getData('products') || [];
    const searchResults = products.filter((product) => {
        return product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    });
    const searchResultsHtml = searchResults.map((product) => {
        return `
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price}</p>
        `;
    }).join('');
    const searchResultsPage = document.createElement('div');
    searchResultsPage.innerHTML = `
        <h2>Search Results</h2>
        ${searchResultsHtml}
    `;
    document.body.appendChild(searchResultsPage);
});

// Display search form
document.body.appendChild(searchForm);


// ... (previous code remains the same)

// Category filtering functionality
const categories = ['Electronics', 'Fashion', 'Home Goods'];
const categoryButtons = categories.map((category) => {
    const button = document.createElement('button');
    button.textContent = category;
    button.addEventListener('click', () => {
        const products = getData('products') || [];
        const filteredProducts = products.filter((product) => product.category === category);
        const filteredProductsHtml = filteredProducts.map((product) => {
            return `
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: ${product.price}</p>
            `;
        }).join('');
        const categoryPage = document.createElement('div');
        categoryPage.innerHTML = `
            <h2>${category}</h2>
            ${filteredProductsHtml}
        `;
        document.body.appendChild(categoryPage);
    });
    return button;
});

const categoryContainer = document.createElement('div');
categoryContainer.innerHTML = `
    <h2>Categories</h2>
`;
categoryContainer.appendChild(...categoryButtons);

// Display category container
document.body.appendChild(categoryContainer);

// Product editing functionality
const editProductForm = document.createElement('form');
editProductForm.innerHTML = `
    <h2>Edit Product</h2>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title"><br><br>
    <label for="description">Description:</label>
    <textarea id="description" name="description"></textarea><br><br>
    <label for="price">Price:</label>
    <input type="number" id="price" name="price"><br><br>
    <button id="save-changes-btn">Save Changes</button>
`;

const saveChangesBtn = editProductForm.querySelector('#save-changes-btn');
saveChangesBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const productId = editProductForm.dataset.productId;
    const title = editProductForm.querySelector('#title').value;
    const description = editProductForm.querySelector('#description').value;
    const price = editProductForm.querySelector('#price').value;
    const products = getData('products') || [];
    const productIndex = products.findIndex((product) => product.id === productId);
    products[productIndex].title = title;
    products[productIndex].description = description;
    products[productIndex].price = price;
    saveData('products', products);
    console.log('Product updated successfully!');
});

// Product deletion functionality
const deleteProductBtn = document.createElement('button');
deleteProductBtn.textContent = 'Delete Product';

deleteProductBtn.addEventListener('click', () => {
    const productId = deleteProductBtn.dataset.productId;
    const products = getData('products') || [];
    const productIndex = products.findIndex((product) => product.id === productId);
    products.splice(productIndex, 1);
    saveData('products', products);
    console.log('Product deleted successfully!');
});

// This will use the already declared 'productlistings' from earlier in the code.
productlistings.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-product-btn')) {
        const productId = e.target.dataset.productId;
        const product = getData('products') || [].find((product) => product.id === productId);
        editProductForm.dataset.productId = productId;
        editProductForm.querySelector('#title').value = product.title;
        editProductForm.querySelector('#description').value = product.description;
        editProductForm.querySelector('#price').value = product.price;
        document.body.appendChild(editProductForm);
        deleteProductBtn.dataset.productId = productId;
        document.body.appendChild(deleteProductBtn);
    }
});


// ... (previous code remains the same)

// Add event listener to logout button
const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Logout';
logoutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});

// Display logout button
document.body.appendChild(logoutBtn);

// Add CSS styles for logout button
const styles = document.createElement('style');
styles.innerHTML = `
    #logout-btn {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;
document.head.appendChild(styles);