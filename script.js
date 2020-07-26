class Calculator {
  constructor(previousCalculationDisplay, currentOperandDisplay) {
    this.previousCalculationDisplay = previousCalculationDisplay;
    this.currentOperandDisplay = currentOperandDisplay;
    this.clear()
  }

  appendNumber(number) {
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  updateCurrentOperandDisplay() {
    if (this.currentOperand.length > 15) {
    this.currentOperandDisplay.innerText = this.currentOperand.substr(this.currentOperand.length - 15);
    this.currentOperandDisplay.style.color = '#e96f4b';
    } else {
      this.currentOperandDisplay.innerText = this.currentOperand;
      this.currentOperandDisplay.style.color = 'white';
    }
  }

  updatePreviousCalculationDisplay() {
    this.previousCalculationDisplay.innerText = this.previousCalculation;
   }

  processOperand(selectedOperand) {
     //Stop input of operand if first item input or if last item in 'prev. calculation display'
    let operandInputs = ['÷', '×', '+', '-'];
    if ((this.previousCalculation == '' &&  this.currentOperand == '') || operandInputs.includes(this.previousCalculation.substr(-1))) {
      return 
    } else if (this.previousCalculation == '') {
      this.firstOperation(selectedOperand)
    } else {
      this.compute(selectedOperand, previousCalculation);
    }
  }

  firstOperation(selectedOperand) {
    this.appendNumber(' '  + selectedOperand)
    this.previousCalculation += this.currentOperand;
    this.updatePreviousCalculationDisplay()
    this.currentOperand = '';
    this.updateCurrentOperandDisplay()
  }

  clear() {
    this.currentOperand = '';
    this.previousCalculation = '';
  }

  delete() {
     this.currentOperand = this.currentOperand.toString().slice(0, - 1);
  }

  compute(operand, computationDisplayed) {
    
  }
}

let numberButtons = document.querySelectorAll('button[data-number]');

let operatorButtons = document.querySelectorAll('button[data-operator]');

let inPlaceConverter = document.querySelectorAll('button[data-in-place-converter]');

let clearButton = document.querySelector('button[data-clear]');

let delButton = document.querySelector('button[data-del]');

let computerButton = document.querySelector('button[data-computer]');

let previousCalculationDisplay = document.querySelector('div[data-previous-calculation]')

let currentOperandDisplay = document.querySelector('div[data-current-operand]')

const calculator = new Calculator(previousCalculationDisplay, currentOperandDisplay)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Stop input of decimal if already present in current operand
    if (button.innerText == '.' && calculator.currentOperand.includes('.')) {
      return
    } else {
      calculator.appendNumber(button.innerText)
      calculator.updateCurrentOperandDisplay()
    }
})})

operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
      calculator.processOperand(button.innerText)
    })
})

clearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateCurrentOperandDisplay()
  calculator.updatePreviousCalculationDisplay()
})

delButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateCurrentOperandDisplay()
}) 

/* 99999999999999999999999999 */