

const res = document.getElementById('response');
const form = document.getElementById('form');
const celsiusBtn = document.querySelector('.Celsius');
const fahrenheitBtn = document.querySelector('.Fahrenheit');
const element_result = document.getElementById('element_result');
let sentence = '';
let temperatureInput = '';

function getTypeTemperatureInput(ipt){
    if(ipt === 'Celsius'){
        fahrenheitBtn.classList.remove('selected')
        celsiusBtn.classList.add('selected');
    }else{
        fahrenheitBtn.classList.add('selected');
        celsiusBtn.classList.remove('selected')
    }
   return temperatureInput = ipt;
}
function transformCelsiusToFahrenheit(degCel){
    return (degCel * (9/5) + 32);
}
function transformFahrenheitToCelsius(degCel){
    return (degCel - 32 * 5/9);
} 
form.onkeydown = function(e){
    if(e.keyCode == 13){
        e.preventDefault();
        getSentenceResult()
    }
 };
function getSentenceResult(){
    const value = +res.value;
    if(temperatureInput === ''){
        return element_result.innerHTML = 'Please enter valid conversion';
    }
    if(isNaN(value)){
        return element_result.innerHTML = 'Input data not correct.';
    }
       const val = temperatureInput === 'Celsius' ? transformCelsiusToFahrenheit(value) : transformFahrenheitToCelsius(value);
       const labelTemperature = (temperatureInput === 'Celsius') ? ' Fahrenheit' : ' Celsius' ;
       return element_result.innerHTML = `<p class='response'>${value} ${temperatureInput} give ${parseInt(val)} ${labelTemperature}</p>`;

}
