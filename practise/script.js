// Load products from localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products;
  }
  
  // Save products to localStorage
  function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  // Render products on the View Products Page
  function renderProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
      productList.innerHTML = ''; // Clear the list
      const products = loadProducts();
  
      // Calculate total cost
      const totalCost = calculateTotalCost(products);
  
      // Display total cost
      const totalCostElement = document.createElement('div');
      totalCostElement.id = 'total-cost';
      totalCostElement.innerHTML = `<strong>Total Cost of All Products: ksh${totalCost.toFixed(2)}</strong>`;
      productList.appendChild(totalCostElement);
  
      // Render each product
      products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${product.name} - Quantity: ${product.quantity} - Price: ksh${product.price}</span>
          <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(li);
      });
    }
  }
  
  // Calculate the total cost of all products
  function calculateTotalCost(products) {
    return products.reduce((total, product) => {
      return total + (product.quantity * product.price);
    }, 0);
  }
  
  // Add a new product
  document.getElementById('product-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const productName = document.getElementById('product-name').value.trim();
    const productQuantity = parseInt(document.getElementById('product-quantity').value.trim(), 10);
    const productPrice = parseFloat(document.getElementById('product-price').value.trim());
  
    if (productName && !isNaN(productQuantity) && !isNaN(productPrice)) {
      const products = loadProducts();
      products.push({ name: productName, quantity: productQuantity, price: productPrice });
      saveProducts(products);
      document.getElementById('form-message').textContent = 'Product added successfully!';
      document.getElementById('product-form').reset();
    } else {
      document.getElementById('form-message').textContent = 'Please fill out all fields correctly.';
    }
  });
  
  // Delete a product
  function deleteProduct(index) {
    const products = loadProducts();
    products.splice(index, 1);
    saveProducts(products);
    renderProducts(); // Re-render the product list and total cost
  }
  
  // Render products on page load (View Products Page)
  if (window.location.pathname.endsWith('view-products.html')) {
    renderProducts();
  }
  // Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    toggleButton.textContent = 'Light Mode';
  } else {
    toggleButton.textContent = ' Dark Mode';
  }
});