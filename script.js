// Get references to the HTML elements
const output = document.getElementById('output');
const numberButtons = document.querySelectorAll('.numberBtn');
const operatorButtons = document.querySelectorAll('.operatorBtn');
const clearButton = document.getElementById('clearBtn');
const resetButton = document.getElementById('resetBtn');
const equalsButton = document.getElementById('equalsBtn');

const theme1Radio = document.getElementById('theme-1');
const theme2Radio = document.getElementById('theme-2');
const theme3Radio = document.getElementById('theme-3');

let currentInput = '';
let previousInput = '';
let currentOperator = null;
let clearNextNumber = false;

function applyTheme() {
  if (theme1Radio.checked) {
    loadCSS('./css/main.css');
  } else if (theme2Radio.checked) {
    loadCSS('./css/mode-2.css');
  } else if (theme3Radio.checked) {
    loadCSS('./css/mode-3.css');
  }
}

// Function to load a CSS file dynamically
function loadCSS(filename) {
    const head = document.querySelector('head');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = filename;
    head.appendChild(link);
}

// Event listener for theme radio buttons
theme1Radio.addEventListener('click', applyTheme);
theme2Radio.addEventListener('click', applyTheme);
theme3Radio.addEventListener('click', applyTheme);

applyTheme();

function updateDisplay() {
  output.value = currentInput;
}

function calculate() {
    try {
      currentInput = currentInput.replace(/x/g, '*').replace(/÷/g, '/');
      currentInput = eval(currentInput).toString(); 
    } catch (error) {
      currentInput = 'Error'; 
    }
  }

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (clearNextNumber) {
        currentInput = ''; 
        clearNextNumber = false; 
      }
      currentInput += button.dataset.number;
      updateDisplay();
    });
});


operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentInput === '') return;
      currentInput += button.dataset.operator;
      previousInput = currentInput;
      currentOperator = button.dataset.operator;
      clearNextNumber = false; 
      updateDisplay();
    });
});

// Event listener for the equals button
equalsButton.addEventListener('click', () => {
    if (previousInput === '' || currentInput === '') return;
    calculate();
    currentOperator = null;
    previousInput = '';
    clearNextNumber = true; 
    updateDisplay();
});

// Event listener for the clear button
clearButton.addEventListener('click', () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
});

// Event listener for the reset button
resetButton.addEventListener('click', () => {
  currentInput = '';
  previousInput = '';
  currentOperator = null;
  updateDisplay();
});

// Initialize the display
updateDisplay();
 