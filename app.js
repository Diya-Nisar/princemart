// DOM Elements
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');
const productQuantityInput = document.getElementById('productQuantity');
const productPriceInput = document.getElementById('productPrice');
const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];

// Inventory array
let inventory = [];

// Event listener to handle form submission
productForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get values from inputs
  const productName = productNameInput.value;
  const productQuantity = parseInt(productQuantityInput.value);
  const productPrice = parseFloat(productPriceInput.value);

  // Validate inputs
  if (!productName || isNaN(productQuantity) || isNaN(productPrice) || productQuantity <= 0 || productPrice <= 0) {
    alert('Please enter valid product information');
    return;
  }

  // Create a new product object
  const newProduct = {
    id: Date.now(),
    name: productName,
    quantity: productQuantity,
    price: productPrice
  };

  // Add the new product to the inventory
  inventory.push(newProduct);

  // Clear input fields
  productNameInput.value = '';
  productQuantityInput.value = '';
  productPriceInput.value = '';

  // Update the table
  updateInventoryTable();
});

// Function to update the inventory table
function updateInventoryTable() {
  // Clear the table
  inventoryTableBody.innerHTML = '';

  // Populate the table with current inventory
  inventory.forEach(product => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    const quantityCell = document.createElement('td');
    quantityCell.textContent = product.quantity;
    row.appendChild(quantityCell);

    const priceCell = document.createElement('td');
    priceCell.textContent = `$${product.price.toFixed(2)}`;
    row.appendChild(priceCell);

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteProduct(product.id);
    });
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    inventoryTableBody.appendChild(row);
  });
}

// Function to delete a product
function deleteProduct(productId) {
  inventory = inventory.filter(product => product.id !== productId);
  updateInventoryTable();
}
