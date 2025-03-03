let currentPage = 1;
let choice = "";
const pages = {
    left: {
        title: "The Haunted House",
        text: "You cautiously enter an eerie house, its walls covered in ancient writings...",
    },
    right: {
        title: "The Whispering Woods",
        text: "As you walk deeper, the trees seem to whisper secrets in an unknown language...",
    }
};

function nextPage(pageNumber) {
    let page = document.getElementById(`page${pageNumber}`);
    page.style.transform = "rotateY(-180deg)";
    page.style.zIndex = `${currentPage}`;
    currentPage++;
}

function prevPage(pageNumber) {
    let page = document.getElementById(`page${pageNumber}`);
    page.style.transform = "rotateY(0deg)";
    currentPage--;
}

function restartBook() {
    document.getElementById("page1").style.transform = "rotateY(0deg)";
    document.getElementById("page2").style.transform = "rotateY(0deg)";
    document.getElementById("page3").style.transform = "rotateY(0deg)";
    currentPage = 1;
}

function choosePath(path) {
    choice = path;
    document.getElementById("story-title").innerText = pages[path].title;
    document.getElementById("story-text").innerText = pages[path].text;
    nextPage(1);
}

function solvePuzzle() {
    let answer = prompt("Solve the puzzle: What is 5 + 3?");
    if (answer == "8") {
        alert("Correct! You unlock a hidden passage.");
        nextPage(2);
    } else {
        alert("Wrong! Try again.");
    }
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

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

window.onload = loadBookmark;

