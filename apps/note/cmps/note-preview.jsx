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
    let body
    const { title, content } = noteService.getNoteEditData(note);
    if(note.type === 'note-txt') body = title
    else body = content
    const params = new URLSearchParams({ body });

    navigate('/mail/?' + params.toString())
    // const m =new URLSearchParams('title=dfd&content=as')
    // m.get('title') //'dfd'
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  }


  return (
    <section className='note-preview' style={{ backgroundColor: note.color ? note.color : 'lightblue' }}>
      {getNoteType(type)}
      <div className='note-actions-container'>
        <div className='note-actions'>
          <span onClick={() => removeNote(note.id)} className="material-symbols-outlined ">delete</span>
          <span onClick={duplicateNote} className="material-symbols-outlined">content_copy</span>
          <span  onClick={mailNote} class="material-symbols-outlined">mail</span>
          <span onClick={handlePinNote} className={note.isPinned ? "material-symbols-outlined pinned" : "material-symbols-outlined"}>push_pin</span>
          <label htmlFor={"color" + note.id}><span class="material-symbols-outlined">palette</span></label>
          <input style={{ display: 'none' }} onChange={(e) => handleColorChange(e, note)} type="color" name="color" id={"color" + note.id} />
          {note.type !== "note-todos" ? <span onClick={() => setEditMode(prev => !prev)} class="material-symbols-outlined">edit</span> : null}
          {editMode ? <NoteEdit note={note} editNote={editNote} setEditMode={setEditMode} /> : null}
        </div>
      </div>
    </section>
  )
}







