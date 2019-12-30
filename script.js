function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(func, num1, num2){
    return func(num1,num2);
}



let ad = false;
let sub = false;
let multi = false;
let divi = false;
let clearTotal = false;
let addNegative = true;
let chaining = false;

let number1 = null;
let number2 = null;

let display = document.getElementById("display");

function appendNum(){
    addNegative = true;//set this to append negatives after you've added new number after a computation.
    if(display.innerHTML == 0 || clearTotal == true){//loosely equals so i don't need to convert to number everytime. but if i compare strings, i can keep the 0 for decimal notation.
        display.innerHTML = this.innerHTML;  
        clearTotal = false;// when the calculator finishes a computation, clicking a number before an operation should clear the calculator.
    }else{
        display.innerHTML += this.innerHTML;
    }
}

let calcButtons = document.querySelectorAll("button");

calcButtons.forEach((button)=>{//adds click event to num buttons.
    if(Number(button.innerHTML) || button.innerHTML == 0){
        button.id = button.innerHTML;
        button.addEventListener('click', appendNum);
    }
    
});

let decimal = document.getElementById("decimal");
function appendDecimal(){
    if(!display.innerHTML.match(/\./g)){
        display.innerHTML += ".";
    }
}

decimal.addEventListener('click', appendDecimal);

let plus = document.querySelector("[data-action='add']");
let minus = document.querySelector("[data-action='subtract']");
let cross = document.querySelector("[data-action='multiply']");
let dotDash = document.querySelector("[data-action='divide']");//FINISH THESE!!!*/
let aC = document.querySelector("[data-action='clear']");
let neg = document.querySelector("[data-action='negative']");
let c = document.querySelector("[data-action='undo']");

function undo(){
    display.innerHTML = "0";
}

function appendOrRemoveNegative(){
    if(addNegative === false){
        return 1;
    }
    let negaSymbol = '-';

    if(display.innerHTML.match(/\-/g)){
        display.innerHTML = display.innerHTML.replace(/\-/g, "");
    }else if(!display.innerHTML.match(/\-/g) && display.innerHTML != 0){// don't append neg to zero.
        display.innerHTML = [negaSymbol,display.innerHTML].join("");
    }
}

function store1(){
    //chaining operations.
    if(number1 && chaining){
        
        number2 = parseFloat(display.innerHTML);
        store2AndOperate();
    }
    //chaining operations ^^^^
    number1  = parseFloat(display.innerHTML);
    clearTotal = true;//use this to overwrite the value after clicking an operation
    //display.innerHTML = "0";//matter of preference.
    
    if(this.innerHTML == "+"){
     ad = true;
     sub = false;
     multi = false;
     divi = false;   
    }
    if(this.innerHTML == "-"){
        ad = false;
        sub = true;
        multi = false;
        divi = false;   
    }
    if(this.innerHTML == '×'){
        ad = false;
        sub = false;
        multi = true;
        divi = false;   
    }
    if(this.innerHTML == "÷"){
        ad = false;
        sub = false;
        multi = false;
        divi = true;   
    }
    number2 = null;//resets storage of second number.
    chaining = true;
    
}

function store2AndOperate(){
    if(!number1){
        return 1;
    }
    if(!number2){
        number2 = parseFloat(display.innerHTML);
    }
    
    if(ad){
        display.innerHTML = operate(add,number1,number2).toString();
        number1 = parseFloat(display.innerHTML);
        //ad = false;
        
    }
    if(sub){
        display.innerHTML = operate(subtract,number1,number2).toString();
        number1 = parseFloat(display.innerHTML);
        //sub = false;
    }
    if(multi){
        display.innerHTML = operate(multiply,number1,number2).toString();
        //const vari = number2;
        //number1 = vari;//Need to add boolean values to store number value.
        //overwrite trip boolean on number button click. clear aswell.
        //multi = false;
        number1 = parseFloat(display.innerHTML);
    }
    if(divi){
        display.innerHTML = operate(divide,number1,number2).toString();
        number1 = parseFloat(display.innerHTML);
        //divi = false;

    }//overflow on calulator
    if(display.innerHTML.length > 14 && Math.abs(parseFloat(display.innerHTML)) < 9999999999999){
        display.innerHTML.slice(0, 13);
    }else if(Math.abs(parseFloat(display.innerHTML)) > 9999999999999 && display.innerHTML.match(/\-/g)){
        display.innerHTML = "-9999999999999";
    }else if (Math.abs(parseFloat(display.innerHTML)) > 9999999999999 && !display.innerHTML.match(/\-/g)){
        display.innerHTML = "9999999999999";
    }
    clearTotal = true;
    addNegative = false;
    chaining = false; //chaining should end here and allow for more continous computation...
}

function clear(){
    number1 = null;
    number2 = null;
    display.innerHTML = "0";
    ad = false;
    sub = false;
    multi = false;
    divi = false;
}

plus.addEventListener('click', store1);
minus.addEventListener('click', store1);
cross.addEventListener('click', store1);
dotDash.addEventListener('click', store1);
neg.addEventListener('click', appendOrRemoveNegative);
aC.addEventListener('click', clear);
c.addEventListener('click', undo);
let equal = document.querySelector('[data-action="calculate"]');

equal.addEventListener('click', store2AndOperate);
//console.log(clearTotal);