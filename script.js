// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");

// ---------- Data ----------
let notes = [];

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// ---------- Render ----------
function render() {
  list.replaceChildren();

  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const body = document.createElement("div");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("p");
    meta.classList.add("note-meta");

    const badge = document.createElement("span");
    badge.classList.add("note-category");
    badge.textContent = capitalize(note.category);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    meta.appendChild(badge);
    meta.appendChild(date);
    body.appendChild(text);
    body.appendChild(meta);

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.classList.add("delete-btn");

    li.appendChild(body);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ---------- Add a note ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addNote(input.value.trim(), categorySelect.value);
  input.value = "";
  input.focus();
});

render();