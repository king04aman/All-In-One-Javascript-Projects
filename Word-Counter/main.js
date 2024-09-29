let button = document.getElementById('btn');

button.addEventListener('click', function() {
    let input = document.getElementById('str').value;
    let charCount = input.length;
    let wordCount = input.trim().split(/\s+/).filter(Boolean).length;

    // Display the word and character count
    let outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<h2>Character Count: ${charCount}</h2><h2>Word Count: ${wordCount}</h2>`;
});
