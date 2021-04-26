const btns = document.querySelectorAll('button');
const display = document.getElementById('output');

let displayValue = 0;

let firstValue = 0;
let secondValue = 0;

let firstOperator = '';
let secondOperator = '';

let solution = 0;

function updateDisplay() {
    display.textContent = displayValue;
}

updateDisplay();

btns.forEach(btn => {
    btn.addEventListener('click', event => {
        if (event.target.hasAttribute('data-number')) {
            if (firstValue === 0) {
                // first click = input of first value
                if (displayValue === 0) {
                    displayValue = event.target.value;
                } else {
                    displayValue += event.target.value;
                }
            } else {
                // third click = input of second value
                if (displayValue === firstValue) {
                    displayValue = event.target.value;
                } else {
                    displayValue += event.target.value;
                }
            }
            updateDisplay();
        } 
        if (event.target.hasAttribute('data-operator')) { 
            if(firstOperator != '' && secondOperator === '') {
                //fourth click = if there is already the first operator,
                //input of second operator
                secondOperator = event.target.value;
                secondValue = displayValue;
                solution = operate(firstOperator, firstValue, secondValue);
                if (solution === 'ERROR...ERROR') {
                    displayValue = 'ERROR...ERROR';
                } else {
                    displayValue = Math.round(solution * 1000) / 1000;
                    firstValue = displayValue;
                    solution = 0;
                }
                updateDisplay();
            } else if (firstOperator != '' && secondOperator != '') {
                //sixth click = input of new operator
                secondValue = displayValue;
                solution = operate(secondOperator, firstValue, secondValue);
                secondOperator = event.target.value;
                if (solution === 'ERROR...ERROR') {
                    displayValue = 'ERROR...ERROR';
                } else {
                    displayValue = Math.round(solution * 1000) / 1000;
                    firstValue = displayValue;
                    solution = 0;
                }
                updateDisplay();
            } 
            else {
                //second click = input of first operator
                firstOperator = event.target.value;
                firstValue = displayValue;
            }    

        }
        if (event.target.hasAttribute('data-equals')) {
            if (firstOperator === '') {
                //pressing equals when there is no operator
                displayValue = displayValue;
            } else if (secondOperator != '') {
                //if there is a second operator, next equals operation
                secondValue = displayValue;
                solution = operate(secondOperator, firstValue, secondValue);
                if (solution === 'ERROR...ERROR') {
                    displayValue = 'ERROR...ERROR';
                } else {
                    displayValue = Math.round(solution * 1000) / 1000;
                    firstValue = displayValue;
                    secondValue = 0;
                    firstOperator = '';
                    secondOperator = '';
                    solution = 0;
                }
                updateDisplay();
            } else {
                //first equals operaton
                secondValue = displayValue;
                solution = operate(firstOperator, firstValue, secondValue);
                if (solution === 'ERROR...ERROR') {
                    displayValue = 'ERROR...ERROR';
                } else {
                    displayValue = Math.round(solution * 1000) / 1000;
                    firstValue = displayValue;
                    secondValue = 0;
                    firstOperator = '';
                    secondOperator = '';
                    solution = 0;
                }
                updateDisplay();
            }
        }
        if (event.target.hasAttribute('data-clear')) {
            //reset of all variables
            displayValue = 0;
            firstValue = 0;
            secondValue = 0;
            firstOperator = '';
            secondOperator = '';
            solution = 0;
            updateDisplay();
        } 
        if (event.target.hasAttribute('data-delete')) {
            if (displayValue === 0) {
                displayValue = displayValue;
            } else {
                displayValue = displayValue.toString().slice(0, -1);
            }
            updateDisplay();
        }
    });
});

function add (a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract (a, b) {
    return parseInt(a) - parseInt(b);
}

function multiply (a, b) {
    return parseInt(a) * parseInt(b);
}

function divide (a, b) {
    if (b === 0 || b === '0') {
        return 'ERROR...ERROR';
    } else {
        return parseInt(a) /   parseInt(b);
    }
}

function operate (operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}