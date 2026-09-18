// Jimmy Wong - September 11, 2026 - Lab 04
// script.js
const zipInput = document.getElementById('zipcode');

// const zipPattern = /^\d{5}$/;
// const isValidZip = zipPattern.test(zipInput.value);
// console.log(isValidZip); // true or false

zipInput.addEventListener('input', () => {
    const zipPattern = /^\d{5}$/;
    const isValidZip = zipPattern.test(zipInput.value);
    console.log(isValidZip); // Logs true or false to the Console!
});