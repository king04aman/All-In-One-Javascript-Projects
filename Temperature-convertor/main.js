

const res = document.getElementById('response');
const form = document.getElementById('form');
const celsiusBtn = document.querySelector('.Celsius');
const fahrenheitBtn = document.querySelector('.Fahrenheit');
const KelvinBtn = document.querySelector('.Kelvin');
const element_result = document.getElementById('element_result');
const Celsius_output =  document.querySelector('.Celsius_output');
const Fahrenheit_output =  document.querySelector('.Fahrenheit_output');
const Kelvin_output =  document.querySelector('.Kelvin_output');
let sentence = '';
let temperatureInput = '';
let temperatureOutput = '';

function getTypeTemperatureInput(ipt){
    switch (ipt) {
        case 'Celsius': {
            fahrenheitBtn.classList.remove('selected');
            KelvinBtn.classList.remove('selected');
            celsiusBtn.classList.add('selected');
            return temperatureInput = ipt;
        }
        case 'Fahrenheit': {
            celsiusBtn.classList.remove('selected');
            KelvinBtn.classList.remove('selected');
            fahrenheitBtn.classList.add('selected');
            return temperatureInput = ipt;
        }
        case 'Kelvin': {
            fahrenheitBtn.classList.remove('selected')
            celsiusBtn.classList.remove('selected');
            KelvinBtn.classList.add('selected');
            return temperatureInput = ipt;
        }
    }
}
function getTypeTemperatureOutput(ipt){
    switch (ipt) {
        case 'Celsius': {
            Fahrenheit_output.classList.remove('selected');
            Kelvin_output.classList.remove('selected');
            Celsius_output.classList.add('selected');
            return temperatureOutput = ipt;
        }
        case 'Fahrenheit': {
            Celsius_output.classList.remove('selected');
            Kelvin_output.classList.remove('selected');
            Fahrenheit_output.classList.add('selected');
            return temperatureOutput = ipt;
        }
        case 'Kelvin': {
            Fahrenheit_output.classList.remove('selected')
            Celsius_output.classList.remove('selected');
            Kelvin_output.classList.add('selected');
            return temperatureOutput = ipt;
        }
    }
}

function transformCelsiusToFahrenheit(degCel){
    return (degCel * (9/5) + 32);
}
function transformCelsiusToKelvin(celsius) {
    return celsius + 273.15;
}
function transformFahrenheitToCelsius(degCel){
    return (degCel - 32 * 5/9);
}
function transformFahrenheitToKelvin(fahrenheit) {
    return (fahrenheit - 32) * 5/9 + 273.15;
}
function transformKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}
function transformKelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

function getTransformFunction(input, output,value){
   if( input === 'Celsius'){
      switch (output) {
          case 'Fahrenheit' : {
              return transformCelsiusToFahrenheit(value);
          }
          case 'Kelvin' : {
              return transformCelsiusToKelvin(value);
          }
      }
   }   if( input === 'Fahrenheit'){
      switch (output) {
          case 'Celsius' : {
              return transformFahrenheitToCelsius(value);
          }
          case 'Kelvin' : {
              return transformFahrenheitToKelvin(value);
          }
      }
   }   if( input === 'Kelvin'){
      switch (output) {
          case 'Fahrenheit' : {
              return transformKelvinToFahrenheit(value);
          }
          case 'Celsius' : {
              return transformKelvinToCelsius(value);
          }
      }
   }
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
    if(temperatureInput === ''){
        return element_result.innerHTML = 'Please enter valid conversion';
    }
    else if(temperatureOutput === temperatureInput){
        return element_result.innerHTML = 'Please enter valid conversion';
    }
       const val = getTransformFunction(temperatureInput, temperatureOutput, value)
       return element_result.innerHTML = `<p class='response'>${value} ${temperatureInput} give ${parseInt(val)} ${temperatureOutput}</p>`;

}
