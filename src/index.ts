import * as fs from 'fs';
import * as path from 'path';

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

const NOTES_FILE = path.join(__dirname, '../notes.json');

function loadNotes(): Note[] {
  if (!fs.existsSync(NOTES_FILE)) return [];
  const data = fs.readFileSync(NOTES_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveNotes(notes: Note[]): void {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2), 'utf-8');
}

function createNote(title: string, content: string, tags: string[]): void {
  const notes = loadNotes();
  const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  notes.push({ id, title, content, tags });
  saveNotes(notes);
  console.log('Note créée avec succès.');
}

function listNotes(): void {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log('Aucune note trouvée.');
    return;
  }
  notes.forEach(note => {
    console.log(`#${note.id} - ${note.title} [${note.tags.join(', ')}]`);
  });
}

function searchNotes(keyword: string): void {
  const notes = loadNotes();
  const results = notes.filter(note =>
    note.title.includes(keyword) ||
    note.content.includes(keyword) ||
    note.tags.some(tag => tag.includes(keyword))
  );
  if (results.length === 0) {
    console.log('Aucune note trouvée pour ce mot-clé.');
    return;
  }
  results.forEach(note => {
    console.log(`#${note.id} - ${note.title} [${note.tags.join(', ')}]`);
  });
}

function exportNotes(filename: string): void {
  const notes = loadNotes();
  fs.writeFileSync(filename, JSON.stringify(notes, null, 2), 'utf-8');
  console.log(`Notes exportées dans ${filename}`);
}

function printHelp() {
  console.log(`\nCommandes disponibles :
  create <titre> <contenu> <tags, séparés par ,>
  list
  search <mot-clé>
  export <fichier.json>
  help
`);
}

function main() {
  const [,, cmd, ...args] = process.argv;
  switch (cmd) {
    case 'create':
      if (args.length < 3) {
        console.log('Usage: create <titre> <contenu> <tags, séparés par ,>');
        break;
      }
      createNote(args[0], args[1], args[2].split(','));
      break;
    case 'list':
      listNotes();
      break;
    case 'search':
      if (args.length < 1) {
        console.log('Usage: search <mot-clé>');
        break;
      }
      searchNotes(args[0]);
      break;
    case 'export':
      if (args.length < 1) {
        console.log('Usage: export <fichier.json>');
        break;
      }
      exportNotes(args[0]);
      break;
    case 'help':
    default:
      printHelp();
  }
}

main();
