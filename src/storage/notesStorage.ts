import type { Note } from "../types/Note";

const STORAGE_KEY = "neptune-notes";

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function loadNotes(): Note[] {
  const storedNotes = localStorage.getItem(STORAGE_KEY);

  if (!storedNotes) {
    return [];
  }

  try {
    const parsedNotes: unknown = JSON.parse(storedNotes);

    if (!Array.isArray(parsedNotes)) {
      return [];
    }

    return parsedNotes as Note[];
  } catch {
    return [];
  }
}

export function clearNotes(): void {
  localStorage.removeItem(STORAGE_KEY);
}