var calculator = document.getElementById('calculator');
var preview = document.getElementById('preview');

var previousValue = null;
var pendingOperation = null;

var operations = {
    add: function(a, b) {
        return a + b;
    },
    subtract: function(a, b) {
        return a - b;
    },
    multiply: function(a, b) {
        return a * b;
    },
    divide: function(a, b) {
        return a / b;
    }
};

document.addEventListener('keyup', function(event) {
    console.log('keyup:', event);
}); 

document.querySelectorAll('button').forEach(function(button) {
    button.addEventListener('click', function(event) {
        var value = event.target.innerText.toLowerCase().trim();

        if (value === 'c') {
            preview.value = '';  
            preview.placeholder = '0';
            previousValue = null;
            pendingOperation = null;          
        } else if (event.target.getAttribute('op')) {
            var op = event.target.getAttribute('op').toLowerCase().trim();
            var isEditing = preview.value.trim() !== '';
            var currentValue = parseFloat(isEditing ? preview.value : preview.placeholder);

            // console.log('OP',op,'Current Value', currentValue);

            if (pendingOperation && isEditing) {
                // console.log('pendingOperation & previousValue:', previousValue);
                previousValue = pendingOperation(previousValue, currentValue);
                // console.log('new previous:', previousValue);
            } else {
                previousValue = currentValue;
                // console.log('set previous to current:', previousValue);
            }

            preview.value = '';
            preview.placeholder = previousValue;

            if (typeof operations[op] === 'function') {
                // console.log('using op function for:', op);
                pendingOperation = operations[op];                    
            }
        } else {
            preview.value += value;
        }
    });
});