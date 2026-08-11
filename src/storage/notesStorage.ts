import type { Note } from "../types/Note";

const STORAGE_KEY = "neptune-notes";

function isNote(value: unknown): value is Note {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const note = value as Record<string, unknown>;

  return (
    typeof note.id === "string" &&
    typeof note.title === "string" &&
    typeof note.content === "string" &&
    typeof note.createdAt === "number" &&
    typeof note.updatedAt === "number"
  );
}

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

    return parsedNotes.filter(isNote);
  } catch {
    console.warn(
      "Neptune Notes: Could not load saved notes."
    );

    return [];
  }
}

export function clearNotes(): void {
  localStorage.removeItem(STORAGE_KEY);
}