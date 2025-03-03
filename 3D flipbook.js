let currentPage = 1;
let choice = "";
let audio = new Audio("page-flip.mp3");
let backgroundMusic = new Audio("background-music.mp3");
backgroundMusic.loop = true;

const pages = {
    left: {
        title: "The Haunted House",
        text: "You cautiously enter an eerie house, its walls covered in ancient writings...",
        ending: "You uncover an ancient book that glows in your hands. The secrets within change you forever..."
    },
    right: {
        title: "The Whispering Woods",
        text: "As you walk deeper, the trees seem to whisper secrets in an unknown language...",
        ending: "The whispers guide you to an ancient relic. As you touch it, you become part of the forest itself..."
    }
};

// Play background music
function toggleMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
}

// Play page flip sound
function playFlipSound() {
    audio.currentTime = 0;
    audio.play();
}

// Flip pages forward
function nextPage(pageNumber) {
    let page = document.getElementById(`page${pageNumber}`);
    page.style.transform = "rotateY(-180deg)";
    page.style.zIndex = `${currentPage}`;
    playFlipSound();
    currentPage++;
}

// Flip pages backward
function prevPage(pageNumber) {
    let page = document.getElementById(`page${pageNumber}`);
    page.style.transform = "rotateY(0deg)";
    playFlipSound();
    currentPage--;
}

// Restart book
function restartBook() {
    document.querySelectorAll(".page").forEach(page => {
        page.style.transform = "rotateY(0deg)";
    });
    currentPage = 1;
    playFlipSound();
}

// Select path & update storyline
function choosePath(path) {
    choice = path;
    document.getElementById("story-title").innerText = pages[path].title;
    document.getElementById("story-text").innerText = pages[path].text;
    nextPage(1);
}

// Solve a puzzle with an animation
function solvePuzzle() {
    let answer = prompt("Solve the puzzle: What is 5 + 3?");
    if (answer === "8") {
        alert("Correct! The secret door opens.");
        document.body.classList.add("puzzle-solved");
        setTimeout(() => {
            document.body.classList.remove("puzzle-solved");
        }, 2000);
        nextPage(2);
    } else {
        alert("Wrong! Try again.");
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Save and Load Bookmark
function saveBookmark() {
    localStorage.setItem("bookmark", currentPage);
    alert("Bookmark saved!");
}

function loadBookmark() {
    let savedPage = localStorage.getItem("bookmark");
    if (savedPage) {
        alert("Resuming from Page " + savedPage);
        currentPage = savedPage;
    }
}

// Reveal a hidden clue
function revealClue() {
    alert("You find an ancient note: 'Look where the light does not touch...'");
}

// Unlock Final Ending Based on Choice
function showEnding() {
    if (choice === "left") {
        alert(pages.left.ending);
    } else if (choice === "right") {
        alert(pages.right.ending);
    } else {
        alert("Your story is incomplete...");
    }
}

// Enable page turn with mouse drag
document.addEventListener("mousedown", function (event) {
    let startX = event.clientX;
    document.addEventListener("mouseup", function (event) {
        let endX = event.clientX;
        if (startX > endX) {
            if (currentPage < 6) nextPage(currentPage);
        } else {
            if (currentPage > 1) prevPage(currentPage - 1);
        }
    }, { once: true });
});

window.onload = loadBookmark;

