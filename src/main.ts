import "./style.css";
import "./styles/sidebar.css";
import "./styles/editor.css";

import type { Note } from "./types/Note";

const newNoteButton = document.querySelector<HTMLButtonElement>(
  "#new-note-button"
);

const searchInput = document.querySelector<HTMLInputElement>(
  "#search-input"
);

const noteList = document.querySelector<HTMLElement>(
  "#note-list"
);

const noteTitle = document.querySelector<HTMLInputElement>(
  "#note-title"
);

const noteContent = document.querySelector<HTMLTextAreaElement>(
  "#note-content"
);

if (
  !newNoteButton ||
  !searchInput ||
  !noteList ||
  !noteTitle ||
  !noteContent
) {
  throw new Error("Neptune Notes: Required UI elements were not found.");
}

let notes: Note[] = [];
let activeNoteId: string | null = null;

console.log("Neptune Notes initialized.");

newNoteButton.addEventListener("click", () => {
  console.log("New Note clicked.");
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  console.log("Searching for:", query);
});

noteTitle.addEventListener("input", () => {
  console.log("Title changed:", noteTitle.value);
});

noteContent.addEventListener("input", () => {
  console.log("Content changed:", noteContent.value);
});