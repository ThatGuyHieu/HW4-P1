// Function to get input values as whole numbers
function getWholeNumberInput(id) {
  return Math.round(parseFloat(document.getElementById(id).value));
}

// Function to check if a value is a valid integer
function isValidInteger(value) {
  return !isNaN(value) && !/[a-zA-Z]/g.test(value);
}

// Function to display an error message and highlight the input element
function displayError(message, element) {
  document.getElementById('table-content').innerHTML = `<h2>${message}</h2>`;
  element.style.backgroundColor = "red";
}

// Function to validate input range
function isValidRange(value, min, max, errorMessage, element) {
  if (isNaN(value) || !isValidInteger(value) || value < min || value > max) {
    displayError(errorMessage, element);
    return false;
  }
  return true;
}

// Function to reset input element styles
function resetInputStyles(...elements) {
  elements.forEach(element => {
    element.style.backgroundColor = "white";
  });
}

// Function to generate the table content
function generateTableContent(minRow, maxRow, minCol, maxCol) {
  var table = '';
  var y = +minRow;

  // Generate table header
  table += '<tr>' + '<td>' + ' ' + '</td>';
  for (var x = +minCol; x <= +maxCol; ++x) {
    table += '<td>' + x + '</td>';
  }
  table += '</tr>';

  // Generate table rows and columns
  for (var i = +minRow; i <= +maxRow; i++) {
    table += '<tr>';
    table += '<td>' + y + '</td>';
    ++y;
    for (var j = +minCol; j <= +maxCol; j++) {
      table += '<td>' + i * j + '</td>';
    }
    table += '</tr>';
  }

  // Generate table content
  document.getElementById('table-content').innerHTML = '<table>' + table + '</table>';
}

// Event listener for the submit button
const submitButton = document.querySelector("#submit-btn");
submitButton.addEventListener("click", () => {
  document.getElementById("clear-btn").disabled = false;

  const minRow = getWholeNumberInput("rowmin");
  const maxRow = getWholeNumberInput("rowmax");
  const minCol = getWholeNumberInput("colmin");
  const maxCol = getWholeNumberInput("colmax");

  const minRowElement = document.getElementById("rowmin");
  const maxRowElement = document.getElementById("rowmax");
  const minColElement = document.getElementById("colmin");
  const maxColElement = document.getElementById("colmax");

  resetInputStyles(minRowElement, maxRowElement, minColElement, maxColElement);

  if (
    isValidRange(minRow, -50, 50, 'Please make sure the minimum row is between -50 and 50!', minRowElement) &&
    isValidRange(maxRow, -50, 50, 'Please make sure the maximum row is between -50 and 50!', maxRowElement) &&
    isValidRange(minCol, -50, 50, 'Please make sure the minimum column is between -50 and 50!', minColElement) &&
    isValidRange(maxCol, -50, 50, 'Please make sure the maximum column is between -50 and 50!', maxColElement) &&
    minRow <= maxRow &&
    minCol <= maxCol
  ) {
    generateTableContent(minRow, maxRow, minCol, maxCol);
  }
});

// Function to clear the input and table content
function clearInputAndTable() {
  document.getElementById("clear-btn").disabled = true;
  const inputIds = ["rowmin", "rowmax", "colmin", "colmax"];
  inputIds.forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("table-content").innerHTML = '';
}
