"use strict";
// Jimmy Wong - November 3, 2026 - Lab 11
// script.js converted to TypeScript, script.ts
// Zip code validation
const zipInput = document.getElementById('zipcode');
zipInput.addEventListener('input', () => {
    const zipPattern = /^\d{5}$/;
    const isValidZip = zipPattern.test(zipInput.value);
    console.log(isValidZip); // Logs true or false to the Console!
});
// Displaying name and labs completed
const studentName = "Jimmy Wong";
let labsCompleted = 10;
let isEnrolled = false;
labsCompleted = labsCompleted + 1; // Increment labsCompleted by 1
console.log(`Hello, my name is ${studentName}. I have completed ${labsCompleted} labs.`);
// Theme toggle functionality
const themeBtn = document.querySelector('#theme-btn');
themeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}
// Like button functionality
const likeBtn = document.querySelector('#like-btn');
const likeCount = document.querySelector('#like-count');
const likeMessage = document.querySelector('#like-message');
function updateLikeDisplay(count) {
    likeCount.textContent = `${count} likes`;
    if (count >= 10) {
        likeMessage.textContent = "Wow, thanks for all the likes!";
    }
    else if (count >= 5) {
        likeMessage.textContent = "Glad you like it!";
    }
    else {
        likeMessage.textContent = "";
    }
}
const LikeCounter = {
    likes: Number(localStorage.getItem('likes')) || 0,
    increment() {
        this.likes = this.likes + 1;
        localStorage.setItem('likes', this.likes.toString());
        updateLikeDisplay(this.likes);
        this.render();
    },
    render() {
        updateLikeDisplay(this.likes);
        likeCount.textContent = `${this.likes} likes`;
    }
};
LikeCounter.render();
if (likeBtn) {
    likeBtn.addEventListener('click', () => { LikeCounter.increment(); });
}
else {
    console.warn('Like button not found in the DOM.');
}
// Displaying goals in a list
const goals = ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "APIs", "GitHub"];
const goalsList = document.querySelector('#goals-list');
goals.forEach(function (goal) {
    const listItem = document.createElement('li');
    listItem.textContent = goal;
    goalsList.appendChild(listItem);
});
// Asynchronous greeting after a delay
function getGreetingAfterDelay() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Hello from the future!");
        }, 800);
    });
}
getGreetingAfterDelay().then(function (greeting) {
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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json());
        factDisplay.textContent = data.fact;
    }
    catch (error) {
        console.error('Error fetching the fact:', error);
        factDisplay.textContent = "Failed to load a fact. Please try again.";
    }
}
if (factBtn) {
    factBtn.addEventListener('click', loadFact);
}
else {
    console.warn('Fact button not found in the DOM.');
}
// Lab 10 - Geolocation
const locationBtn = document.querySelector('#location-btn');
const locationDisplay = document.querySelector('#location-display');
locationBtn.addEventListener('click', function () {
    if (!(navigator.geolocation)) {
        locationDisplay.textContent = "Geolocation is not supported by your browser.";
        return;
    }
    locationDisplay.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude.toFixed(2);
        const longitude = position.coords.longitude.toFixed(2);
        locationDisplay.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
    }, function (error) {
        locationDisplay.textContent = "Unable to retrieve your location.";
        console.warn(`Error: ${error.message}`);
    });
});
// Stealing localStorage data (for demonstration purposes)
const stolen = {};
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
        stolen[key] = localStorage.getItem(key);
    }
}
console.log("Stolen localStorage data:", JSON.stringify(stolen));
// Lab 11 - Graduate Extension: Storage Functions
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
}
saveToStorage("likes", 5);
const savedLikes = loadFromStorage("likes");
console.log(`Saved likes: ${savedLikes}`);
const sampleFact = { fact: "Cats have five toes on their front paws, but only four toes on their back paws.", length: 85 };
saveToStorage("lastFact", sampleFact);
const savedFact = loadFromStorage("lastFact");
if (savedFact) {
    console.log(`Saved fact: ${savedFact.fact} (Length: ${savedFact.length})`);
}
