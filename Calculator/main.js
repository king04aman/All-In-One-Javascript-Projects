const form = document.getElementById('myform');

// Function to append value to the display
function appendToDisplay(value) {
    form.display.value += value;
}

// Function to clear the display
function clearDisplay() {
    form.display.value = '';
}

// Function to evaluate the expression in the display
function calculate() {
    try {
        form.display.value = eval(form.display.value.replace(/x/g, '*'));
    } catch (error) {
        form.display.value = 'Error';
    }
}

// Assign event listeners to buttons
document.querySelectorAll('input[type=button]').forEach(button => {
    button.addEventListener('click', function() {
        const value = this.value;

        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else {
            appendToDisplay(value);
        }
    });
});
