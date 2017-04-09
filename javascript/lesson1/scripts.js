
var calculator = document.getElementById('calculator');
var opPreview = document.getElementById('op-preview');
var preview = document.getElementById('preview');

var previousValue = null;
var pendingOperation = null;

var listenKeys = '0123456789.'

var evaluationKeys = [
    '=',
    'enter'
];

var operationKeys = {
    '+': function(a, b) {
        return a + b;
    },
    '-': function(a, b) {
        return a - b;
    },
    '*': function(a, b) {
        return a * b;
    },
    '/': function(a, b) {
        return a / b;
    },
    '%': function(a, b) {
        return a % b;
    },
    '^': function(a, b) {
        return Math.pow(a, b);
    }
};

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

function triggerOperation(op) {
    opPreview.innerText = op;
    
    calculate();

    pendingOperation = operationKeys[op];                    
}

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

document.addEventListener('keyup', function(event) {
    pressCalculatorButton(event.key);
}); 

document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('click', function(event) {
        pressCalculatorButton(event.target.innerText);
    });
});