import * as fs from 'fs';
import * as path from 'path';

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

const NOTES_FILE = path.join(__dirname, '../notes.json');

export function loadNotes(): Note[] {
  if (!fs.existsSync(NOTES_FILE)) return [];
  const data = fs.readFileSync(NOTES_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveNotes(notes: Note[]): void {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf-8');
}

export function createNote(title: string, content: string, tags: string[]): Note {
  const notes = loadNotes();
  const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  const note = { id, title, content, tags };
  notes.push(note);
  saveNotes(notes);
  return note;
}

export function searchNotes(keyword: string): Note[] {
  const notes = loadNotes();
  return notes.filter(note =>
    note.title.includes(keyword) ||
    note.content.includes(keyword) ||
    note.tags.some(tag => tag.includes(keyword))
  );
}

export function listNotes(): Note[] {
  return loadNotes();
}
