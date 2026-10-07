# QuickNotes

## Description

QuickNotes is a simple note-taking web app built with HTML, CSS and JavaScript. Users can write short notes, sort them into Personal, Work or Study categories, search through them and delete the ones they no longer need. Notes are saved in the browser with localStorage, so they are still there after the page is refreshed or the browser is closed.

## Features

- Add notes of up to 200 characters
- Choose a category for each note: Personal, Work or Study
- Each category has its own colour style
- Each note shows its text, category, and the date and time it was created
- Delete any note with its own Delete button
- Live search that filters notes as you type (not case-sensitive)
- Validation with clear error messages for empty or over-long notes
- Note counter that handles zero, one and many notes correctly
- Notes saved automatically with localStorage and restored when the page loads
- Responsive layout that stacks the form on screens 600px wide or narrower

## How to Run the Project Locally

1. Clone the repository:
```bash
   git clone https://github.com/YOUR-USERNAME/quicknotes-app.git
```
2. Open the project folder:
```bash
   cd quicknotes-app
```
3. Open `index.html` in your web browser by double-clicking it. No installation or build step is needed.

## What I learned

- How to use the DOM (`querySelector`, `createElement`, `appendChild`) to build and update a page with JavaScript.
- Why user text goes in with `textContent` and never `innerHTML`, to prevent XSS attacks.
- How to keep notes in one array and redraw the screen with a `render()` function, so the page always matches the data.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`.