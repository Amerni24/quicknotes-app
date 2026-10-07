// ---------- Select elements ----------
const clearAllBtn = document.querySelector("#clear-all-btn");
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");

const STORAGE_KEY = "quicknotes";
const MAX_LENGTH = 200;

// ---------- Data and storage ----------
let notes = loadNotes();

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// ---------- Render ----------
function render() {
  list.replaceChildren();

  const term = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(term)
  );

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    list.appendChild(empty);
  }

  visibleNotes.forEach((note) => {
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
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// ---------- Events ----------
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

searchInput.addEventListener("input", render);
clearAllBtn.addEventListener("click", () => {
  if (notes.length === 0) return;
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});
render();