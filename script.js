class Calculator {
  constructor(previousCalculationDisplay, currentNumberDisplay) {
    this.previousCalculationDisplay = previousCalculationDisplay;
    this.currentNumberDisplay = currentNumberDisplay;
    this.currentNumber = '';
    this.previousCalculation = '';
  }

  changePreviousCalculation(previous, replace=false) {
    replace ?
    this.previousCalculation = previous:
    this.previousCalculation += previous;
  }

  changePreviousCalculationDisplay(previous, replace=false) {
    if (replace == false) {
      this.previousCalculationDisplay.innerText += previous
    } else {
      this.previousCalculationDisplay.innerText = previous;
      if (this.previousCalculationDisplay.innerText.length > 10) {
        this.previousCalculationDisplay.innerText = Number(this.previousCalculationDisplay.innerText).toExponential(4);
      }
    }
  }

  changeCurrentNumber(number, replace=false) {
    replace ?
    this.currentNumber = number:
    this.currentNumber += number;
  }

  changeCurrentNumberDisplay(number, replace=false, answer=false) {
    replace ?
    this.currentNumberDisplay.innerText = number:
    this.currentNumberDisplay.innerText += number;

    if (answer) {
    //calculation after "=" press
      if (this.currentNumberDisplay.innerText.length > 10) {
        this.currentNumberDisplay.innerText = Number(this.currentNumberDisplay.innerText).toExponential(4)
      }
    }

    else {
    //user input
      if (this.currentNumber.length > 14) {
        //limit input display to 15 characters 
        this.currentNumberDisplay.innerText =  this.currentNumber.slice(0, 1) + '...' + this.currentNumber.slice(-13);
        
        if(!this.currentNumber.includes('-')) {
          //turn input dark yellow if - && length > 15
          this.currentNumberDisplay.style.color = '#B3B3B3';
        } else {
          //turn input grey if + && length> 15
          this.currentNumberDisplay.style.color = '#CCCC00'
        }
      } else {
        this.currentNumber.includes('-') ?
        //turn input yellow if - && length < 15
        this.currentNumberDisplay.style.color = 'yellow':
        //input default white
        this.currentNumberDisplay.style.color = 'white';
      }
    }
  }

  operate() {
    let calculationArray = this.previousCalculation.split(' ');
    let answer
    switch (calculationArray[1]){
      case '÷':
        answer = calculationArray[0] / this.currentNumber;
        break;
      case '×':
        answer = calculationArray[0] * this.currentNumber;
        break;
      case '+':
        answer = Number(calculationArray[0]) + Number(this.currentNumber);
        break;
      case '-':
        answer = calculationArray[0] - this.currentNumber;
      }
      return answer.toString()
  }
}

let previousCalculationDisplay = document.querySelector('div[data-previous-calculation]');
let currentNumberDisplay = document.querySelector('div[data-current-number]')
let numberButtons = document.querySelectorAll('button[data-number]');
let operatorButtons = document.querySelectorAll('button[data-operator]');
let computerButton = document.querySelector('button[data-computer]');
let pctButton = document.querySelector('button[data-pct]');
let valueInvertButton = document.querySelector('button[data-value-invert]');
let delButton = document.querySelector('button[data-del]');
let clearButton = document.querySelector('button[data-clear]');

const calculator = new Calculator(previousCalculationDisplay, currentNumberDisplay);

numberButtons.forEach(button => button.addEventListener('click', () => {
  
  if ((button.innerHTML == '.' && calculator.currentNumber.includes('.')) || (button.innerHTML == '0' && calculator.currentNumber == '')) {
    //block '0' or '.' input if current field empty
    return
  }
  calculator.changeCurrentNumber(button.innerHTML);
  calculator.changeCurrentNumberDisplay(calculator.currentNumber.slice(-1));
}))

operatorButtons.forEach(button => button.addEventListener('click', () => {
  if (calculator.previousCalculation == '' && calculator.currentNumber == '') {
    //block operator input if all fields empty
    return
  } else if (calculator.previousCalculation == '' && calculator.currentNumber != ''){
    //move current field and operator to previous calc field and empty if previous field empty
    calculator.changePreviousCalculation(calculator.currentNumber + ' ' + button.innerHTML + ' ');
    calculator.changePreviousCalculationDisplay(calculator.currentNumber, replace=true);
    calculator.changePreviousCalculationDisplay(' ' + button.innerHTML + ' ');
    calculator.changeCurrentNumber('', replace=true);
    calculator.changeCurrentNumberDisplay(calculator.currentNumber, replace=true);
  } else if (calculator.previousCalculation != '' && calculator.currentNumber == '') {
    //replace operator if current field empty
    calculator.changePreviousCalculation(calculator.previousCalculation.slice(0, -3) + ' ' + button.innerHTML + ' ', replace=true);
    calculator.changePreviousCalculationDisplay(calculator.previousCalculationDisplay.innerHTML.slice(0, -3), replace=true);
    calculator.changePreviousCalculationDisplay(' ' + button.innerHTML + ' ');
  } else {
    //perform calculation if both fields full
    let calculatedValue = calculator.operate();
    calculator.changePreviousCalculation(calculatedValue + ' ' + button.innerHTML + ' ', replace=true);
    calculator.changePreviousCalculationDisplay(calculatedValue, replace=true);
    calculator.changePreviousCalculationDisplay(' ' + button.innerHTML + ' ');
    calculator.changeCurrentNumber('', replace=true)
    calculator.changeCurrentNumberDisplay(calculator.currentNumber, replace=true);
   }
}))

computerButton.addEventListener('click', ()=> {
  if (calculator.previousCalculation == ''){
    return
  }
  let calculatedValue = calculator.operate();
  calculator.changeCurrentNumber(calculatedValue, replace=true);
  calculator.changeCurrentNumberDisplay(calculator.currentNumber, replace=true, answer=true);
  calculator.changePreviousCalculation('', replace=true);
  calculator.changePreviousCalculationDisplay(calculator.previousCalculation, replace=true);
})

pctButton.addEventListener('click', ()=> {
  calculator.changeCurrentNumber((calculator.currentNumber  *.01).toString(), replace=true);
  calculator.changeCurrentNumberDisplay(calculator.currentNumber, replace=true);
})


valueInvertButton.addEventListener('click', ()=> {
  if (calculator.currentNumber == ''){
    return
  }
  calculator.currentNumber.includes('-') ?
  calculator.changeCurrentNumber(calculator.currentNumber.substr(1), replace=true):
  calculator.changeCurrentNumber('-' + calculator.currentNumber, replace=true);
  calculator.changeCurrentNumberDisplay(calculator.currentNumber, replace=true);
})

delButton.addEventListener('click', ()=>{
  calculator.changeCurrentNumber(calculator.currentNumber.slice(0, -1), replace=true);
  calculator.changeCurrentNumberDisplay(calculator.currentNumber, replace=true);
  
  if (calculator.currentNumber * 1 == 0 || calculator.currentNumber == '.' || calculator.currentNumber == '-.' || calculator.currentNumber == '-' || calculator.currentNumber.includes('e')) {
    //delete remaining characters if current field == (empty || 0)
    calculator.changeCurrentNumber('', replace=true);
    calculator.changeCurrentNumberDisplay(calculator.currentNumber, replace=true);
    }
  }
)

clearButton.addEventListener('click', ()=>{
  calculator.changeCurrentNumber('', replace=true);
  calculator.changeCurrentNumberDisplay('', replace=true);
  calculator.changePreviousCalculation('', replace=true);
  calculator.changePreviousCalculationDisplay('', replace=true);
})

document.addEventListener("keydown", (e) => {
  event.preventDefault();
  console.log(e.key)
  if (e.key == "." || (e.key >= 0 && e.key <= 9)) {
    document.querySelector(`button[data-number='${e.key}']`).click()
  } else if (e.key == "+") {
    document.querySelector("button[data-operator='+']").click()
  } else if (e.key == "-") {
    document.querySelector("button[data-operator='-']").click()
  } else if (e.key == "/") {
    document.querySelector("button[data-operator='÷']").click()
  } else if (e.key == "*") {
    document.querySelector("button[data-operator='×']").click()
  } else if (e.key == "Enter" || e.key == "=") {
    computerButton.click();
  } else if (e.key == "%") {
    pctButton.click();
  } else if (e.key == "Backspace") {
    delButton.click();
  } else if (e.key == "Delete" || e.key == "Escape") {
    clearButton.click()
  }
});