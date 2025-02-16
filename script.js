const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
let lastActionWasEvaluation = false;

// Clear display when "C" button is pressed
clearButton.addEventListener('click', () => {
    display.textContent = '0';
    lastActionWasEvaluation = false;
});

// Delete last character when "←" button is pressed
backspaceButton.addEventListener('click', () => {
    if (display.textContent.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = '0';
    }
    lastActionWasEvaluation = false;
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === '=') {
            try {
                // Replace symbols with JavaScript operators
                let expression = display.textContent.replace('×', '*').replace('÷', '/');
                
                // Evaluate expression
                let result = eval(expression);
                
                // Handle edge case for division by zero
                if (result === Infinity || result === -Infinity || isNaN(result)) {
                    display.textContent = 'Error';  // Display error for invalid results like division by zero
                } else {
                    display.textContent = result;
                }
                
                lastActionWasEvaluation = true;
            } catch (e) {
                display.textContent = 'Error'; // Show error for invalid calculations
                lastActionWasEvaluation = false;
            }
        } else if (button.textContent !== 'C' && button.textContent !== '←') {
            // Prevent multiple operators in a row
            if (['+', '-', '×', '÷'].includes(button.textContent)) {
                const lastChar = display.textContent[display.textContent.length - 1];
                if (['+', '-', '×', '÷'].includes(lastChar)) {
                    return; // Don't add another operator if the last character is already an operator
                }
            }

            // If the display shows 0 or Error, replace it with the clicked value
            if (display.textContent === '0' || display.textContent === 'Error' || lastActionWasEvaluation) {
                display.textContent = button.textContent;
                lastActionWasEvaluation = false;
            } else {
                display.textContent += button.textContent;
            }
        }
    });
});
