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
let likes = 0;

function incrementLikes() {
    likes++;
    updateLikeDisplay();
}
function updateLikeDisplay() {
    likeCount.textContent = `${likes} likes`;
}
if (likeBtn) {
    likeBtn.addEventListener('click', incrementLikes);
} else {
    console.warn('Like button not found in the DOM.');
}
function updateLikeDisplay() {
    likeCount.textContent = `${likes} likes`;
    if (likes >= 10) {
        likeMessage.textContent = "Wow, thanks for all the likes!";
    } else if (likes >= 5) {
        likeMessage.textContent = "Glad you like it!";
    } else {
        likeMessage.textContent = "";
    }
}

const likeCounter = {
    likes: 0,
    increment() {
        this.likes++;
        this.render();
    },
    render() {
        likeCount.textContent = `${this.likes} likes`;
    }
};

// Displaying goals in a list
const goals = ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "APIs", "GitHub"];
const goalsList = document.querySelector('#goals-list');

goals.forEach(goal => {
    const listItem = document.createElement('li');
    listItem.textContent = goal;
    goalsList.appendChild(listItem);
});