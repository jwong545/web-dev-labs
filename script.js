// Jimmy Wong - October 24, 2026 - Lab 09
// script.js

// Zip code validation
const zipInput = document.getElementById('zipcode');
zipInput.addEventListener('input', () => {
    const zipPattern = /^\d{5}$/;
    const isValidZip = zipPattern.test(zipInput.value);
    console.log(isValidZip); // Logs true or false to the Console!
});

const name = "Jimmy Wong";
let labsCompleted = 8;
let isEnrolled = false;
labsCompleted = labsCompleted + 1; // Increment labsCompleted by 1
console.log(`Hello, my name is ${name}. I have completed ${labsCompleted} labs.`);

// Theme toggle functionality
const themeBtn = document.querySelector('#theme-btn');
themeBtn.addEventListener('click', () => { document.body.classList.toggle('dark'); });

// Like button functionality
const likeBtn = document.querySelector('#like-btn');
const likeCount = document.querySelector('#like-count');
const likeMessage = document.querySelector('#like-message');

function updateLikeDisplay(count) {
    likeCount.textContent = `${count} likes`;
    if (count >= 10) { likeMessage.textContent = "Wow, thanks for all the likes!"; }
    else if (count >= 5) { likeMessage.textContent = "Glad you like it!"; }
    else { likeMessage.textContent = ""; }
}
function createLikeCounter() {
    let likes = 0;
    return {
        increment() {
            likes++;
            updateLikeDisplay(likes);
        },
        getLikes() { return likes; }
    }
}

const counter = createLikeCounter();

if (likeBtn) { likeBtn.addEventListener('click', () => { counter.increment(); }); }
else { console.warn('Like button not found in the DOM.'); }

// Displaying goals in a list
const goals = ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "APIs", "GitHub"];
const goalsList = document.querySelector('#goals-list');

goals.forEach(goal => {
    const listItem = document.createElement('li');
    listItem.textContent = goal;
    goalsList.appendChild(listItem);
});

// Lab 09 - Asynchronous Programming
function getGreetingAfterDelay() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("Hello from the future!");
        }, 800);
    });
}
getGreetingAfterDelay().then(function(greeting) {
    console.log(greeting);
});

async function displayGreeting() {
    const greeting = await getGreetingAfterDelay();
    console.log(greeting);
}
displayGreeting();

const factBtn = document.querySelector('#fact-btn');
const factDisplay = document.querySelector('#fact-display');
const url = "https://catfact.ninja/fact";

async function loadFact() {
    factDisplay.textContent = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }
        const data = await response.json();
        factDisplay.textContent = data.fact;
    } catch (error) {
        console.error('Error fetching the fact:', error);
        factDisplay.textContent = "Failed to load a fact. Please try again.";
    }
}

if (factBtn) { factBtn.addEventListener('click', loadFact); }
else { console.warn('Fact button not found in the DOM.'); }
