let spreadsheetData = [];

document.addEventListener("DOMContentLoaded", () => {
    generateSpreadsheet();
});

// Generate the initial spreadsheet (5 rows, 5 columns)
function generateSpreadsheet(rows = 5, cols = 5) {
    const table = document.getElementById("spreadsheet");
    table.innerHTML = "";

    // Create column headers
    const headerRow = table.insertRow();
    for (let col = 0; col < cols; col++) {
        const th = document.createElement("th");
        th.innerText = String.fromCharCode(65 + col); // A, B, C, D...
        headerRow.appendChild(th);
    }

    // Create rows with input fields
    for (let row = 0; row < rows; row++) {
        const tr = table.insertRow();
        const rowData = [];
        for (let col = 0; col < cols; col++) {
            const td = tr.insertCell();
            const input = document.createElement("input");
            input.type = "text";
            input.addEventListener("input", () => updateCell(row, col, input.value)); // Add event listener for data entry
            td.appendChild(input);
            rowData.push(""); // Initialize cell data
        }
        spreadsheetData.push(rowData);
    }
}

// Update the cell content when data is entered
function updateCell(row, col, value) {
    spreadsheetData[row][col] = value;
}

// Apply mathematical function to selected cells
function applyFunction(functionName) {
    const range = getSelectedRange();
    const cells = range.map(cell => spreadsheetData[cell[0]][cell[1]]);
    
    let result = 0;
    switch(functionName) {
        case 'sum': result = sum(cells); break;
        case 'average': result = average(cells); break;
        case 'max': result = max(cells); break;
        case 'min': result = min(cells); break;
        case 'count': result = count(cells); break;
        case 'trim': result = trim(cells); break;
        case 'upper': result = toUpperCase(cells); break;
        case 'lower': result = toLowerCase(cells); break;
        case 'removeDuplicates': result = removeDuplicates(cells); break;
    }
    alert(`Result of ${functionName}: ${result}`);
}

// Get selected range (just for demo, you can modify to allow users to select a range)
function getSelectedRange() {
    return [[0, 0], [0, 1], [1, 0], [1, 1]]; // Example: select cells (0,0), (0,1), (1,0), (1,1)
}

// Mathematical functions
function sum(range) {
    return range.reduce((sum, cell) => sum + parseFloat(cell) || 0, 0);
}

function average(range) {
    return sum(range) / range.length;
}

function max(range) {
    return Math.max(...range.map(cell => parseFloat(cell) || -Infinity));
}

function min(range) {
    return Math.min(...range.map(cell => parseFloat(cell) || Infinity));
}

function count(range) {
    return range.filter(cell => !isNaN(cell)).length;
}

// Data quality functions
function trim(range) {
    return range.map(cell => cell.trim());
}

function toUpperCase(range) {
    return range.map(cell => cell.toUpperCase());
}

function toLowerCase(range) {
    return range.map(cell => cell.toLowerCase());
}

function removeDuplicates(range) {
    return [...new Set(range)];
}

// Add/Delete rows and columns
function addRow() {
    const table = document.getElementById("spreadsheet");
    const row = table.insertRow();
    const rowData = [];
    for (let col = 0; col < spreadsheetData[0].length; col++) {
        const td = row.insertCell();
        const input = document.createElement("input");
        input.type = "text";
        input.addEventListener("input", () => updateCell(spreadsheetData.length, col, input.value)); // Update data on input
        td.appendChild(input);
        rowData.push(""); // Initialize data for new row
    }
    spreadsheetData.push(rowData);
}

function deleteRow() {
    const table = document.getElementById("spreadsheet");
    if (table.rows.length > 1) { // Keep header row
        table.deleteRow(table.rows.length - 1);
        spreadsheetData.pop(); // Remove last row data
    }
}

function addColumn() {
    const table = document.getElementById("spreadsheet");
    for (let row = 0; row < table.rows.length; row++) {
        const cell = table.rows[row].insertCell();
        if (row === 0) {
            const th = document.createElement("th");
            th.innerText = String.fromCharCode(65 + spreadsheetData[0].length); // Add new column header
            cell.appendChild(th);
        } else {
            const input = document.createElement("input");
            input.type = "text";
            input.addEventListener("input", () => updateCell(row - 1, spreadsheetData[0].length, input.value));
            cell.appendChild(input);
        }
    }
    for (let row = 0; row < spreadsheetData.length; row++) {
        spreadsheetData[row].push(""); // Add empty data for new column
    }
}

function deleteColumn() {
    const table = document.getElementById("spreadsheet");
    if (table.rows[0].cells.length > 1) { // Keep at least one column
        for (let row = 0; row < table.rows.length; row++) {
            table.rows[row].deleteCell(table.rows[row].cells.length - 1);
        }
        for (let row = 0; row < spreadsheetData.length; row++) {
            spreadsheetData[row].pop(); // Remove data from last column
        }
    }
}
