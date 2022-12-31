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
        <form onSubmit={handleSubmitNote} className="flex create-form">
            <section className="note-creator-container">
                <div>
                    <input type="textarea"
                        id="txt"
                        name="txt"
                        placeholder="enter text"
                    />
                    {noteType !== 'note-txt' ? <input className="note-data" placeholder={PLACEHOLDER[noteType]} type='text' id='noteData' name='noteData' /> : null}
                </div>
                <div>
                    <label htmlFor="note-txt"><span class="material-symbols-outlined icon-btn">article</span></label>
                    <input type="radio" name="note-type" id="note-txt" className="radio-btn-hidden" defaultChecked onChange={handleNoteTypeChange} />
                    <label htmlFor="note-img"><span class="material-symbols-outlined icon-btn">image</span></label>
                    <input type="radio" name="note-type" id="note-img" className="radio-btn-hidden" onChange={handleNoteTypeChange} />
                    <label htmlFor="note-vid"><span class="material-symbols-outlined icon-btn">smart_display</span></label>
                    <input type="radio" name="note-type" id="note-vid" className="radio-btn-hidden" onChange={handleNoteTypeChange} />
                    <label htmlFor="note-todos"><span class="material-symbols-outlined icon-btn">list_alt</span></label>
                    <input type="radio" name="note-type" id="note-todos" className="radio-btn-hidden" onChange={handleNoteTypeChange} />
                </div>

                <button className="create-note-btn"><span class="material-symbols-outlined icon-btn">note_add</span></button>
            </section>
        </form>
    )

}