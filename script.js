// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");

const MAX_LENGTH = 200;

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
    del.addEventListener("click", () => deleteNote(note.id));

    li.appendChild(body);
    li.appendChild(del);
    list.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

// ---------- Add and delete ----------
function addNote(text, category) {
  notes.push({
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// ---------- Form with validation ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  input.value = "";
  input.focus();
});

render();