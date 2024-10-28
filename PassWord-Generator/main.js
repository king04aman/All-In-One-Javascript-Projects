const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const textEl = document.getElementById('text')
const generateEl = document.getElementById('generate')
const clipboardBtn = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardBtn.addEventListener('click', () => {
    const password = resultEl.innerText
    if (!password) return
    navigator.clipboard.writeText(password)
})

generateEl.addEventListener('click', () => {
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    const length = +lengthEl.value
    const text = textEl.value

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, text, length)
})

function generatePassword(lower, upper, number, symbol, text, length) {
    let generatedPassword = text
    const typesCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return text.slice(0, length)
    }


    while (generatedPassword.length < length) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }


    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}
