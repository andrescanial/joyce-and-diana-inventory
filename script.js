function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    // Simplified example: log the file name
    if (file) {
        console.log(`Upload file: ${file.name}`);
        // Here you can implement your file parsing logic for CSV/XLSX/PDF
    }
}

function addItem() {
    const itemName = prompt("Ilagay ang pangalan ng item:");
    const stockLevel = prompt("Ilagay ang stock level:");

    if (itemName && stockLevel) {
        const table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(table.rows.length);
        newRow.innerHTML = `<td>${itemName}</td><td>${stockLevel}</td><td><button onclick="removeItem(this)">Tanggalin</button></td>`;
    }
}

function removeItem(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
}
