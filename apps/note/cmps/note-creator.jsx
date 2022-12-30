const { useState } = React

import { noteService } from "../services/note.service.js";


const PLACEHOLDER = {
    'note-img': 'Enter image url',
    'note-vid': 'Enter video url',
    'note-todos': 'Enter comma-separated todos',
}

export function NoteCreator({ addNote }) {
    const [noteType, setNoteType] = useState('note-txt')

    function handleSubmitNote(ev) {
        ev.preventDefault()
        const { target } = ev;
        const textInput = target.txt.value;
        const noteData = target.noteData ? target.noteData.value : false;
        const note = noteService.createNote(noteType, textInput, noteData);
        addNote(note)
    }

    const handleNoteTypeChange = (e) => {
        const { id } = e.target;
        setNoteType(id)
    }

    return (
        <form onSubmit={handleSubmitNote}>
            <div>
                <input type="textarea"
                    id="txt"
                    name="txt"
                    placeholder="enter text"
                />
                {noteType !== 'note-txt' ? <input placeholder={PLACEHOLDER[noteType]} type='text' id='noteData' name='noteData' /> : null}
            </div>
            <div>
                <label htmlFor="note-txt">Text</label>
                <input type="radio" name="note-type" id="note-txt" defaultChecked onChange={handleNoteTypeChange} />
                <label htmlFor="note-img">Img</label>
                <input type="radio" name="note-type" id="note-img" onChange={handleNoteTypeChange} />
                <label htmlFor="video-note">Video</label>
                <input type="radio" name="note-type" id="note-vid" onChange={handleNoteTypeChange} />
                <label htmlFor="todo-note">Todo</label>
                <input type="radio" name="note-type" id="note-todos" onChange={handleNoteTypeChange} />
            </div>

            <button>Add</button>
        </form>
    )

}