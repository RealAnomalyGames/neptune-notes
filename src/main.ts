import "./style.css";
import "./styles/sidebar.css";
import "./styles/editor.css";

import type { Note } from "./types/Note";

import {
  saveNotes,
  loadNotes
} from "./storage/notesStorage";

const newNoteButton = document.querySelector<HTMLButtonElement>(
  "#new-note-button"
)!;

const searchInput = document.querySelector<HTMLInputElement>(
  "#search-input"
)!;

const noteList = document.querySelector<HTMLElement>(
  "#note-list"
)!;

const noteTitle = document.querySelector<HTMLInputElement>(
  "#note-title"
)!;

const noteContent = document.querySelector<HTMLTextAreaElement>(
  "#note-content"
)!;

let notes: Note[] = loadNotes();
let activeNoteId: string | null = null;

function persistNotes(): void {
  saveNotes(notes);
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createNote(): Note {
  const now = Date.now();

  return {
    id: generateId(),
    title: "Untitled Note",
    content: "",
    createdAt: now,
    updatedAt: now
  };
}

function getActiveNote(): Note | undefined {
  return notes.find((note) => note.id === activeNoteId);
}

function renderNotes(): void {
  noteList.innerHTML = "";

  const query = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  if (filteredNotes.length === 0) {
    const emptyMessage = document.createElement("p");

    emptyMessage.className = "empty-note-list";
    emptyMessage.textContent =
      notes.length === 0
        ? "No notes yet."
        : "No matching notes.";

    noteList.appendChild(emptyMessage);

    return;
  }

  for (const note of filteredNotes) {
    const noteItem = document.createElement("div");

    noteItem.className = "note-item";

    if (note.id === activeNoteId) {
      noteItem.classList.add("active");
    }

    const title = document.createElement("span");

    title.className = "note-item-title";
    title.textContent = note.title || "Untitled Note";

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-note-button";
    deleteButton.textContent = "×";
    deleteButton.setAttribute(
      "aria-label",
      `Delete ${note.title || "Untitled Note"}`
    );

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      deleteNote(note.id);
    });

    noteItem.appendChild(title);
    noteItem.appendChild(deleteButton);

    noteItem.addEventListener("click", () => {
      selectNote(note.id);
    });

    noteList.appendChild(noteItem);
  }
}

function selectNote(noteId: string): void {
  const note = notes.find((item) => item.id === noteId);

  if (!note) {
    return;
  }

  activeNoteId = note.id;

  noteTitle.value = note.title;
  noteContent.value = note.content;

  renderNotes();
}

function clearEditor(): void {
  activeNoteId = null;

  noteTitle.value = "";
  noteContent.value = "";
}

function addNewNote(): void {
  const note = createNote();

  notes.unshift(note);

  persistNotes();

  selectNote(note.id);
}

function deleteNote(noteId: string): void {
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return;
  }

  const wasActiveNote = activeNoteId === noteId;

  notes.splice(noteIndex, 1);

  persistNotes();

  if (wasActiveNote) {
    clearEditor();
  }

  renderNotes();
}

newNoteButton.addEventListener("click", () => {
  addNewNote();
});

searchInput.addEventListener("input", () => {
  renderNotes();
});

noteTitle.addEventListener("input", () => {
  const note = getActiveNote();

  if (!note) {
    return;
  }

  note.title = noteTitle.value;
  note.updatedAt = Date.now();

  persistNotes();
  renderNotes();
});

noteContent.addEventListener("input", () => {
  const note = getActiveNote();

  if (!note) {
    return;
  }

  note.content = noteContent.value;
  note.updatedAt = Date.now();

  persistNotes();
});

clearEditor();
renderNotes();

console.log("Neptune Notes initialized.");