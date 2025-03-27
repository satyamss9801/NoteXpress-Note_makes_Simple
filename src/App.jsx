import { useContext, useEffect, useState } from "react";
import "./assets/css/app.css";
import { Navbar } from "./components/Navbar";
import { NoteCard } from "./components/NoteCard";
import { NoteDetails } from "./components/NoteDetails";
import { UpsertNote } from "./components/UpsertNote";
import Footer from "./components/Footer";
import { PaletteContext } from "./context/PaletteContext";

const palettes = [
  { id: 1, color: "#0d1282", name: "blue-palette" },
  { id: 2, color: "#ff2171", name: "rose-palette" },
  { id: 3, color: "#360d95", name: "violet-palette" },
  { id: 4, color: "#333", name: "black-palette" },
];

export default function App() {
  const { state, dispatch } = useContext(PaletteContext);
  const [onCreateNote, setOnCreateNote] = useState(false);
  const [onViewNote, setOnViewNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPalette, setCurrentPalette] = useState(
    state?.palette ? palettes.find((p) => p.id === state.palette.id) : palettes[0]
  );

  useEffect(() => {
    const tempNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(tempNotes);
  }, []);

  const saveNotes = (items) => {
    localStorage.setItem("notes", JSON.stringify(items));
  };

  const handleCreateNote = (note) => {
    if (note) {
      const tempNotes = [...notes, note];
      setNotes(tempNotes);
      saveNotes(tempNotes);
    }
  };

  const handleDeleteNote = (noteId) => {
    const tempNotes = notes.filter((n) => n.id !== noteId);
    setNotes(tempNotes);
    saveNotes(tempNotes);
  };

  const handleOnUpdate = (note) => {
    setCurrentNote(note);
    setOnCreateNote(true);
  };

  const handleUpdateNote = (note) => {
    if (note) {
      const tempNotes = notes.map((n) => (n.id === note.id ? note : n));
      setNotes(tempNotes);
      setCurrentNote(null);
      saveNotes(tempNotes);
    }
  };

  const handleOnPreview = (note) => {
    setCurrentNote(note);
    setOnViewNote(true);
  };

  // Fix: Search now works correctly
  const filteredNotes = notes.filter((n) =>
    search
      ? n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.desc.toLowerCase().includes(search.toLowerCase())
      : true
  );

  return (
    <div className={`app ${state?.palette ? state?.palette?.name : currentPalette?.name}`}>
      <Navbar
        setOpen={setOnCreateNote}
        state={state}
        dispatch={dispatch}
        setCurrentPalette={setCurrentPalette}
        palettes={palettes}
        currentPalette={currentPalette}
        setSearch={setSearch} // Fix: Passing setSearch correctly
      />
      <div className="wrapper container">
        <div className="notes-wrapper">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onUpdate={handleOnUpdate}
              onPreview={handleOnPreview}
            />
          ))}
        </div>

        {onCreateNote && (
          <UpsertNote
            note={currentNote}
            createNote={handleCreateNote}
            updateNote={handleUpdateNote}
            setOpen={setOnCreateNote}
          />
        )}
        {onViewNote && <NoteDetails note={currentNote} setView={setOnViewNote} />}
      </div>
      <Footer />
    </div>
  );
}
