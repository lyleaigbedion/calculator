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
let div = false;


let number1 = null;
let number2 = null;

let display = document.getElementById("display");
console.log(display.innerHTML);
function appendNum(){
    if(display.innerHTML == 0 && this.innerHTML != 0){//loosely equals so i don't need to convert to number everytime.
        display.innerHTML = this.innerHTML;    
    }else if(display.innerHTML > 0){
        display.innerHTML += this.innerHTML;
    }
}

let calcButtons = document.querySelectorAll("button");

calcButtons.forEach((button)=>{//
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

function store1(){
    number1  = Number(display.innerHTML);
    display.innerHTML = "0";
    if(this.innerHTML == "+"){
     ad = true;   
    }
    
}

function store2AndOperate(){
    number2 = Number(display.innerHTML);
    if(ad == true){
        display.innerHTML = operate(add,number1,number2).toString();
        ad = false;
    }
}

plus.addEventListener('click', store1);

let equal = document.querySelector('[data-action="calculate"]');

equal.addEventListener('click', store2AndOperate);