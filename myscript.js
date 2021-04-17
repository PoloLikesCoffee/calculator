const btns = document.querySelectorAll('button');
const display = document.getElementById('output');
let operator = '';
let currentValue = 0;
let previousValue = 0;

btns.forEach(btn => {
    btn.addEventListener('click', event => {
        if (event.target.hasAttribute('data-number')) {
            //console.log('number', event.target.value);
            
            if(operator){
                currentValue+=event.target.value;
                updateDisplay(event.target.value);
            } else {
                updateDisplay(event.target.value);
                previousValue+=event.target.value;
            }
            
        } else if (event.target.hasAttribute('data-operator')) {
            //console.log('operator', event.target.value);
            if (event.target.value==='=') {
                operate(operator, previousValue, currentValue);
                display.textContent = '';
                updateDisplay(operate(operator, previousValue, currentValue));
            } else {
                updateDisplay(event.target.value);
                operator = event.target.value;
            }
        }
        if (event.target.hasAttribute('data-clear')) {
            //console.log('clear');
            display.textContent = '';
        }
        if (event.target.hasAttribute('data-delete')) {
            //console.log('delete');
            let a = display.textContent;
            let b = a.slice(0, a.length-1);
            display.textContent = b;
        }
    });
});


function updateDisplay (number) {
    display.textContent += number;
    //currentValue += display.textContent;
}


function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

function operate (operator,a, b) {
    switch (operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
    //previous way
    /*
    if (operator == '+') {
        return add(a,b);
    } 
    if (operator == '-') {
        return subtract(a,b);
    }
    if (operator == '*') {
        return multiply(a,b);
    }
    if (operator == '/') {
        return divide(a,b);
    } */
}