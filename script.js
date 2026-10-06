// Jimmy Wong - October 4, 2026 - Lab 07
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

// console.log('script.js is connected!');

// Lab07 - Part 2
const name = "Jimmy Wong";
let labsCompleted = 6;
let isEnrolled = false;

// labsCompleted += 1; // Increment labsCompleted by 1
// labsCompleted++; // Increment labsCompleted by 1
labsCompleted = labsCompleted + 1; // Increment labsCompleted by 1

console.log(`Hello, my name is ${name}. I have completed ${labsCompleted} labs.`);
// Lab07 - End of Part 2

// Lab07 - Part 3
const likeBtn = document.querySelector('#like-btn');
const likeCount = document.querySelector('#like-count');
let likes = 0;

likeBtn.addEventListener('click', () => {
    likes = likes + 1;
    likeCount.textContent = `${likes} likes`;
});
// Lab07 - End of Part 3

// Lab07 - Part 4
const themeBtn = document.querySelector('#theme-btn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
// Lab07 - End of Part 4