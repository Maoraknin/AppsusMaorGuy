import { NoteTxt } from '../cmps/note-txt.jsx';
import { NoteImg } from '../cmps/note-img.jsx';
import { NoteTodos } from '../cmps/note-todos.jsx';
import { NoteVideo } from './note-vid.jsx';
import { NoteEdit } from './note-edit.jsx';
import { noteService } from "../services/note.service.js";
const { useState } = React;
const { useNavigate } = ReactRouterDOM


export function NotePreview({ type, note, editNote, removeNote, addNote }) {
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  function getNoteType(type) {
    switch (type) {
      case "note-txt":
        return <NoteTxt note={note} />

      case "note-img":
        return <NoteImg note={note} />

      case "note-todos":
        return <NoteTodos note={note} />

      case "note-vid":
        return <NoteVideo note={note} />
    }
  }

  const handleColorChange = (e, note) => {
    const color = e.target.value;
    const updatedNote = { ...note, color }
    editNote(updatedNote)
  }

  const handlePinNote = () => {
    const updatedNote = { ...note, isPinned: note.isPinned ? false : true }
    editNote(updatedNote)
  }

  const duplicateNote = () => {
    const duplicateNote = { ...note }
    delete duplicateNote.id
    addNote(duplicateNote)
  }

  const mailNote = () => {
    const { title, content } = noteService.getNoteEditData(note);
    const params = new URLSearchParams({ title, content });

    navigate('/?' + params.toString())
    // const m =new URLSearchParams('title=dfd&content=as')
    // m.get('title') //'dfd'
    //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  }


  return (
    <section className='note-preview' style={{ backgroundColor: note.color ? note.color : 'lightblue' }}>
      {getNoteType(type)}
      <div className='note-actions'>
        <button onClick={() => removeNote(note.id)}>Remove</button>
        <button onClick={duplicateNote}>Duplicate</button>
        <button onClick={mailNote}>Mail</button>
        <button onClick={handlePinNote}>{note.isPinned ? 'Unpin' : 'Pin'}</button>
        <label htmlFor={"color" + note.id}>Color</label>
        <input style={{ display: 'none' }} onChange={(e) => handleColorChange(e, note)} type="color" name="color" id={"color" + note.id} />
        {note.type !== "note-todos" ? <button onClick={() => setEditMode(prev => !prev)}>Edit</button> : null}
        {editMode ? <NoteEdit note={note} editNote={editNote} setEditMode={setEditMode} /> : null}
      </div>
    </section>
  )
}






