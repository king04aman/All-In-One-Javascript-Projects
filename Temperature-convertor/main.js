

const res = document.getElementById('response');
const form = document.getElementById('form');

const element_result = document.getElementById('element_result');
let sentence = '';
function transformCelsiusToFahrenheit(degCel){
    return (degCel * (9/5) + 32);
}
form.onkeydown = function(e){
    if(e.keyCode == 13){
        e.preventDefault();
        getSentenceResult()
    }
 };
function getSentenceResult(){
    const value = +res.value;
 
    if(isNaN(value)){
        return element_result.innerHTML = 'Input data not correct.';
    }
       const val = transformCelsiusToFahrenheit(value);
       return  element_result.innerHTML =  value + ' degrés Celsius donne ' + parseInt(val) + ' Fahrenheit ';
}
