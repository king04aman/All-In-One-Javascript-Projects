

const loader = document.getElementById("loader");
function getQuote() {
    const quoteText = document.getElementById('quoteText');
    const characterName = document.getElementById('characterName');
    const imageUrl = document.querySelector(".image");
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(response => response.json())
        .then(data => {
    console.log("=>(main.js:20) data", data);
            const quote = data[0].quote;
            const character = data[0].character;
            imageUrl.src = data[0].image;
            imageUrl.classList.add('visible');
            quoteText.innerText = `"${quote}"`;
            characterName.innerText = `- ${character}`;
        })
        .catch(error => {
            console.error('Error fetching the quote:', error);
            document.getElementById('quoteText').innerText = 'Failed to fetch quote. Please try again.';
        });
}
