// Jimmy Wong - October 12, 2026 - Lab 08
// script.js

// Zip code validation
const zipInput = document.getElementById('zipcode');
zipInput.addEventListener('input', () => {
    const zipPattern = /^\d{5}$/;
    const isValidZip = zipPattern.test(zipInput.value);
    console.log(isValidZip); // Logs true or false to the Console!
});

// console.log('script.js is connected!');

const name = "Jimmy Wong";
let labsCompleted = 7;
let isEnrolled = false;
labsCompleted = labsCompleted + 1; // Increment labsCompleted by 1
console.log(`Hello, my name is ${name}. I have completed ${labsCompleted} labs.`);

// Theme toggle functionality
const themeBtn = document.querySelector('#theme-btn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Like button functionality
const likeBtn = document.querySelector('#like-btn');
const likeCount = document.querySelector('#like-count');
const likeMessage = document.querySelector('#like-message');

function updateLikeDisplay(count) {
    likeCount.textContent = `${count} likes`;
    if (count >= 10) {
        likeMessage.textContent = "Wow, thanks for all the likes!";
    } else if (count >= 5) {
        likeMessage.textContent = "Glad you like it!";
    } else {
        likeMessage.textContent = "";
    }
}
function createLikeCounter() {
    let likes = 0;

    return {
        increment() {
            likes++;
            updateLikeDisplay(likes);
        },
        getLikes() {
            return likes;
        }
    }
}

const counter = createLikeCounter();

if (likeBtn) {
    likeBtn.addEventListener('click', () => {
        counter.increment();
    });
} else {
    console.warn('Like button not found in the DOM.');
}

// Displaying goals in a list
const goals = ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "APIs", "GitHub"];
const goalsList = document.querySelector('#goals-list');

goals.forEach(goal => {
    const listItem = document.createElement('li');
    listItem.textContent = goal;
    goalsList.appendChild(listItem);
});