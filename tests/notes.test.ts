import { createNote, listNotes, searchNotes, saveNotes } from '../src/notes';
import * as fs from 'fs';
import * as path from 'path';

describe('Notes CLI', () => {
  const NOTES_FILE = path.join(__dirname, '../notes.json');
  const backupFile = path.join(__dirname, '../notes.test.backup.json');

  beforeEach(() => {
    if (fs.existsSync(NOTES_FILE)) {
      fs.copyFileSync(NOTES_FILE, backupFile);
    }
    fs.writeFileSync(NOTES_FILE, '[]', 'utf-8');
  });

  afterEach(() => {
    if (fs.existsSync(backupFile)) {
      fs.copyFileSync(backupFile, NOTES_FILE);
      fs.unlinkSync(backupFile);
    }
  });

  it('crée une note', () => {
    const note = createNote('Test', 'Contenu', ['tag1', 'tag2']);
    expect(note.title).toBe('Test');
    expect(note.tags).toContain('tag1');
    const notes = listNotes();
    expect(notes.length).toBe(1);
    expect(notes[0].title).toBe('Test');
  });

  it('recherche une note par mot-clé', () => {
    createNote('Alpha', 'Bravo', ['tag1']);
    createNote('Beta', 'Charlie', ['tag2']);
    const results = searchNotes('Alpha');
    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Alpha');
  });

  it('recherche une note par tag', () => {
    createNote('Gamma', 'Delta', ['important']);
    const results = searchNotes('important');
    expect(results.length).toBe(1);
    expect(results[0].tags).toContain('important');
  });
});
