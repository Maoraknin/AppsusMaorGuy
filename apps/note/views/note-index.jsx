const { useState, useEffect } = React

import { NoteList } from "../cmps/note-list.jsx"
import { NoteCreator } from "../cmps/note-creator.jsx"
import { noteService } from "../services/note.service.js"


export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query().then((notes) => {
            setNotes(notes)
        })
    }

    function saveNote(note){
        noteService.save(note).then(note => {
            notes.push(note)
            setNotes([...notes])
        })

    }



    return <section>
        <div>
            <NoteCreator saveNote={saveNote} />
        </div>
        <div>
            <NoteList notes={notes} />
        </div>
    </section>

}
