const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const clearBtn = document.getElementById("clear-completed");
const darkBtn = document.getElementById("dark-mode-toggle");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

// Dark mode load
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// Save
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Add
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({ id: Date.now(), text, completed: false });
    input.value = "";
    saveTodos();
    render();
});

// Render
function render() {
    list.innerHTML = "";

    const filtered = todos.filter(todo => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    filtered.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id;

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed) span.classList.add("completed");

        span.addEventListener("dblclick", () => editTodo(todo.id, span));

        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.classList.add("delete");

        li.append(span, btn);
        list.appendChild(li);
    });

    updateStats();
}

// Edit
function editTodo(id, span) {
    const editInput = document.createElement("input");
    editInput.value = span.textContent;

    span.replaceWith(editInput);
    editInput.focus();

    editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") updateTodo(id, editInput.value);
        if (e.key === "Escape") render();
    });
}

function updateTodo(id, text) {
    todos = todos.map(t => t.id === id ? { ...t, text } : t);
    saveTodos();
    render();
}

// Delegation
list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("delete")) {
        todos = todos.filter(t => t.id !== id);
    } else {
        todos = todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    }

    saveTodos();
    render();
});

// Filters
document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
        filter = btn.dataset.filter;
        render();
    });
});

// Stats
function updateStats() {
    const remaining = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${remaining} items left`;
}

// Clear
clearBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    render();
});

// Dark mode toggle
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Init
render();
