// Fetch all items from the API
async function fetchItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item';
        itemElement.innerHTML = `
            <strong>Name:</strong> ${item.name}<br>
            <strong>Description:</strong> ${item.description}
            <div class="actions">
                <button onclick="updateItem(\${item.id})">Update</button>
                <button onclick="deleteItem(\${item.id})">Delete</button>
            </div>
        `;
        itemsContainer.appendChild(itemElement);
    });
}

// Add a new item to the API
document.getElementById('itemForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description })
    });

    document.getElementById('itemForm').reset();
    fetchItems();
});

// Update an item
async function updateItem(id) {
    const newName = prompt('Enter new name:');
    const newDescription = prompt('Enter new description:');
    if (newName && newDescription) {
        await fetch(`/api/items/\${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, description: newDescription })
        });
        fetchItems();
    }
}

// Delete an item
async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        await fetch(`/api/items/\${id}`, { method: 'DELETE' });
        fetchItems();
    }
}

// Load items on page load
fetchItems();