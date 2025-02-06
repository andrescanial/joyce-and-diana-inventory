let inventoryData = [];

// Function to upload inventory data from a CSV file
function uploadInventory() {
    const fileInput = document.getElementById('inventoryFile');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Pumili ng file!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.split('\n').map(line => line.split(','));
        
        // Clear existing inventory data
        inventoryData = [];
        const tbody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Clear existing rows

        // Push data to inventoryData and display
        for (let line of lines) {
            if (line.length === 2) {
                inventoryData.push({
                    item: line[0],
                    quantity: parseInt(line[1])
                });
                const row = tbody.insertRow();
                row.insertCell(0).innerText = line[0];
                row.insertCell(1).innerText = line[1];
            }
        }
    };
    
    reader.readAsText(file);
}

// Function to generate sales forecast
function generateSalesForecast() {
    const forecastResults = document.getElementById('forecastResults');
    forecastResults.innerHTML = ''; // Clear previous results

    // Simplified forecast logic for demonstration
    if (inventoryData.length > 0) {
        let totalQuantity = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
        forecastResults.innerHTML = `<p>Total na Kantidad ng Inventory: ${totalQuantity}</p>`;
    } else {
        forecastResults.innerHTML = '<p>Walang data ng inventory na na-upload.</p>';
    }

    visualizeData();
}

// Function to visualize sales data
function visualizeData() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const labels = inventoryData.map(item => item.item);
    const data = inventoryData.map(item => item.quantity);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Kantidad ng Stocks',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
