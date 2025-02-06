<input type="file" id="inventoryFile" accept=".csv, .xlsx, .xls, .pdf" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>
let inventoryData = [];

// Function to upload inventory data from a file
function uploadInventory() {
    const fileInput = document.getElementById('inventoryFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Pumili ng file!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Clear existing inventory data
        inventoryData = [];
        const tbody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Clear existing rows

        // Assuming the first sheet contains the inventory data
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        jsonData.forEach((line, index) => {
            if (index > 0 && line.length === 2) { // Skip header row
                inventoryData.push({
                    item: line[0],
                    quantity: parseInt(line[1])
                });
                const row = tbody.insertRow();
                row.insertCell(0).innerText = line[0];
                row.insertCell(1).innerText = line[1];
            }
        });
    };
    
    // Read file based on type
    if (file.type.includes("sheet") || file.type.includes("excel")) {
        reader.readAsArrayBuffer(file);
    } else if (file.type.includes("csv")) {
        reader.readAsText(file);
    } else {
        alert('Unsupported file type!');
    }
}
