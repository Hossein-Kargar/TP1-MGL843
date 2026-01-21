import * as fs from 'fs';
import * as path from 'path';


interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
}

export class NoteManager {
  private notesFile: string;

  constructor(notesFile: string) {
    this.notesFile = notesFile;
  }

  loadNotes(): Note[] {
    if (!fs.existsSync(this.notesFile)) return [];
    const data = fs.readFileSync(this.notesFile, 'utf-8');
    return JSON.parse(data);
  }

  saveNotes(notes: Note[]): void {
    fs.writeFileSync(this.notesFile, JSON.stringify(notes, null, 2), 'utf-8');
  }

  createNote(title: string, content: string, tags: string[]): void {
    const notes = this.loadNotes();
    const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
    notes.push({ id, title, content, tags });
    this.saveNotes(notes);
    console.log('Note créée avec succès.');
  }

  listNotes(): void {
    const notes = this.loadNotes();
    if (notes.length === 0) {
      console.log('Aucune note trouvée.');
      return;
    }
    notes.forEach(note => {
      console.log(`#${note.id} - ${note.title} [${note.tags.join(', ')}]`);
    });
  }

  searchNotes(keyword: string): void {
    const notes = this.loadNotes();
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

  exportNotes(filename: string): void {
    const notes = this.loadNotes();
    fs.writeFileSync(filename, JSON.stringify(notes, null, 2), 'utf-8');
    console.log(`Notes exportées dans ${filename}`);
  }
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
  const NOTES_FILE = path.join(__dirname, '../notes.json');
  const noteManager = new NoteManager(NOTES_FILE);
  const [,, cmd, ...args] = process.argv;
  switch (cmd) {
    case 'create':
      if (args.length < 3) {
        console.log('Usage: create <titre> <contenu> <tags, séparés par ,>');
        break;
      }
      noteManager.createNote(args[0], args[1], args[2].split(','));
      break;
    case 'list':
      noteManager.listNotes();
      break;
    case 'search':
      if (args.length < 1) {
        console.log('Usage: search <mot-clé>');
        break;
      }
      noteManager.searchNotes(args[0]);
      break;
    case 'export':
      if (args.length < 1) {
        console.log('Usage: export <fichier.json>');
        break;
      }
      noteManager.exportNotes(args[0]);
      break;
    case 'help':
    default:
      printHelp();
  }
}

main();
