const STORAGE_KEY = 'inventory-products';

const defaultProducts = [
  {
    id: crypto.randomUUID(),
    name: 'Trådløs mus',
    category: 'Tilbehør',
    price: 249,
    quantity: 12
  },
  {
    id: crypto.randomUUID(),
    name: 'Tastatur',
    category: 'Elektronikk',
    price: 599,
    quantity: 3
  },
  {
    id: crypto.randomUUID(),
    name: 'Notatbok',
    category: 'Kontor',
    price: 49,
    quantity: 25
  }
];

const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');
const summaryText = document.getElementById('summary');
const messageText = document.getElementById('message');

let products = loadProducts();

function loadProducts() {
  const savedProducts = localStorage.getItem(STORAGE_KEY);

  if (!savedProducts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
    return [...defaultProducts];
  }

  try {
    const parsedProducts = JSON.parse(savedProducts);
    if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
      return parsedProducts;
    }
  } catch (error) {
    console.error('Could not read saved products:', error);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
  return [...defaultProducts];
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function updateSummary(filteredProducts) {
  const totalQuantity = filteredProducts.reduce((sum, product) => sum + Number(product.quantity || 0), 0);
  const totalValue = filteredProducts.reduce((sum, product) => sum + Number(product.price || 0) * Number(product.quantity || 0), 0);

  summaryText.textContent = `Viser ${filteredProducts.length} produkter · Totalt antall: ${totalQuantity} · Lagerverdi: ${totalValue} kr`;
}

function renderProducts() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const selectedCategory = filterSelect.value;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  productList.innerHTML = '';

  if (filteredProducts.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 6;
    cell.textContent = 'Ingen produkter matcher søket eller filteret.';
    row.appendChild(cell);
    productList.appendChild(row);
    updateSummary(filteredProducts);
    return;
  }

  filteredProducts.forEach((product) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;

    const categoryCell = document.createElement('td');
    categoryCell.textContent = product.category;

    const priceCell = document.createElement('td');
    priceCell.textContent = `${Number(product.price).toLocaleString('nb-NO')} kr`;

    const quantityCell = document.createElement('td');
    quantityCell.textContent = product.quantity;

    const statusCell = document.createElement('td');
    statusCell.textContent = Number(product.quantity) > 0 ? 'På lager' : 'Utsolgt';

    const actionsCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Slett';
    deleteButton.addEventListener('click', () => {
      if (products.length <= 1) {
        messageText.textContent = 'Du må ha minst ett produkt i listen.';
        return;
      }

      products = products.filter((item) => item.id !== product.id);
      saveProducts();
      renderProducts();
      messageText.textContent = `Produktet "${product.name}" ble slettet.`;
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(categoryCell);
    row.appendChild(priceCell);
    row.appendChild(quantityCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);
    productList.appendChild(row);
  });

  updateSummary(filteredProducts);
}

productForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const categoryInput = document.getElementById('category');
  const priceInput = document.getElementById('price');
  const quantityInput = document.getElementById('quantity');

  const newProduct = {
    id: crypto.randomUUID(),
    name: nameInput.value.trim(),
    category: categoryInput.value,
    price: Number(priceInput.value),
    quantity: Number(quantityInput.value)
  };

  if (!newProduct.name || Number.isNaN(newProduct.price) || Number.isNaN(newProduct.quantity)) {
    messageText.textContent = 'Fyll ut alle feltene riktig.';
    return;
  }

  products.push(newProduct);
  saveProducts();
  renderProducts();
  messageText.textContent = `Produktet "${newProduct.name}" ble lagt til.`;
  productForm.reset();
  categoryInput.value = 'Elektronikk';
  nameInput.focus();
});

searchInput.addEventListener('input', renderProducts);
filterSelect.addEventListener('change', renderProducts);

renderProducts();
