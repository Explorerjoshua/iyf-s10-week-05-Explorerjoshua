// Selecting
const header = document.getElementById("main-header");
const contents = document.querySelectorAll(".content");
const form = document.getElementById("contact-form");
const firstLink = document.querySelector(".nav-link");

// Traversing
const nav = header.querySelector("nav");
const article = document.querySelector("article");

// Modify content
document.querySelector("h1").textContent = "Updated DOM Practice";

// Attributes
firstLink.setAttribute("href", "https://example.com");

// Styles
document.querySelector(".container").classList.add("highlight");

// Add element
const p = document.createElement("p");
p.textContent = "New paragraph added!";
article.appendChild(p);

// Remove element
document.querySelector("nav li:last-child").remove();

// Clone
const clone = firstLink.parentElement.cloneNode(true);
clone.querySelector("a").textContent = "Blog";
document.querySelector(".nav-list").appendChild(clone);

// Add nav item
function addNavItem(text, href) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = text;
    a.href = href;
    a.classList.add("nav-link");
    li.appendChild(a);
    document.querySelector(".nav-list").appendChild(li);
}
addNavItem("Portfolio", "/portfolio");

// Events
document.querySelector("h1").addEventListener("click", () => {
    alert("Heading clicked!");
});

// Form
form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Form submitted!");
});

// Keyboard
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        document.querySelectorAll("input").forEach(i => i.value = "");
    }
});
