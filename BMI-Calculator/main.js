const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    const height = parseFloat(document.querySelector('#height').value);
    const weight = parseFloat(document.querySelector('#weight').value);
    const results = document.querySelector('#results');

    // Validate height and weight
    if (!height || height <= 0 || isNaN(height)) {
        results.innerHTML = "Please provide a valid height in cm";
    } else if (!weight || weight <= 0 || isNaN(weight)) {
        results.innerHTML = "Please provide a valid weight in kg";
    } else {
        const bmi = (weight / ((height * height) / 10000)).toFixed(2);
        results.innerHTML = `<span>Your BMI: ${bmi}</span>`;
    }
});
