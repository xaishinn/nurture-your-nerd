// Define variables referencing HTML elements in the DOM
var calculator = document.getElementById('calculator');
var opPreview = document.getElementById('op-preview');
var preview = document.getElementById('preview');

// Define some variables we'll use later
var previousValue = null;
var pendingOperation = null;

// Define a string of characters that the keyboard will write to the calculator
var listenKeys = '0123'

// Define an array of keys to listen for evaluating the calculator
var evaluationKeys = [
    '='
];

// Define calculator options (by key)
var operationKeys = {
    // Define the '+' (plus) operation function
    '+': function(a, b) {
        return a + b;
    }
};

// Run calculation
function calculate() {
    var isEditing = preview.value.trim() !== '';
    var currentValue = parseFloat(isEditing ? preview.value : preview.placeholder);

    if (pendingOperation && isEditing) {
        previousValue = pendingOperation(previousValue, currentValue);
    } else {
        previousValue = currentValue;
    }

    preview.value = '';
    preview.placeholder = previousValue;
}

// Trigger an operation
function triggerOperation(op) {
    opPreview.innerText = op;
    
    calculate();

    pendingOperation = operationKeys[op];                    
}

// Button pressed handler
function pressCalculatorButton(button) {
    var value = button.toLowerCase().trim();

    if (evaluationKeys.indexOf(value) !== -1) {
        calculate();
    } else if (typeof operationKeys[value] === 'function') {
        triggerOperation(value);
    } else if (value === 'c') {
        opPreview.innerText = '';
        preview.value = '';  
        preview.placeholder = '0';
        previousValue = null;
        pendingOperation = null;          
    } else if (value.length === 1 && listenKeys.indexOf(value) !== -1) {
        preview.value += value;
    }
}

// Add listener to the entire document for keyboard events
document.addEventListener('keyup', function(event) {
    // Trigger our handler function with the key of this event
    //  - event.key is a string, i.e. '+', '-', '/', '=', 'Enter', etc
    pressCalculatorButton(event.key);
}); 

// Select and iterate through all buttons on the page
document.querySelectorAll('button').forEach(function(button) {
    // Add a click event handler to each button
    button.addEventListener('click', function(event) {
        // Trigger our handler function with the value of this html element (innerText)
        pressCalculatorButton(event.target.innerText);
    });
});