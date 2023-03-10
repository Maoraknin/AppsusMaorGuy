const { useState, useEffect } = React

import { NoteList } from "../cmps/note-list.jsx"
import { NoteCreator } from "../cmps/note-creator.jsx"
import { noteService } from "../services/note.service.js"
import { NoteFilter } from "../cmps/note-fillter.jsx"

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [fillterBy, setFillterBy] = useState(noteService.getDefaultFillter())
    useEffect(() => {
        loadNotes()
    }, [fillterBy])

    function loadNotes() {
        noteService.query(fillterBy).then((notes) => {
            setNotes(notes)
        })
    }

    function addNote(newNote) {
        noteService.save(newNote)
            .then((note) => {
                setNotes((prevNotes) => [...prevNotes, note])
            })
            .catch((err) => {
                console.log('err = ', err)
            })
    }


    const removeNote = (id) => {
        noteService.remove(id)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== id));
            })
            .catch((err) => {
                console.log('err = ', err)
            })
    }

    const editNote = (updatedNote) => {
        noteService.save(updatedNote)
            .then(() => {
                setNotes((prevNotes) => {
                    const updatedNotes = [...prevNotes]
                    const noteIndex = updatedNotes.findIndex(note => note.id === updatedNote.id);
                    updatedNotes[noteIndex] = updatedNote;
                    return updatedNotes
                })
            })
            .catch((err) => {
                console.log('err = ', err)
            })
    }

    const onSetFillter = (fillterBy) => {
        setFillterBy(fillterBy)
    }

    return (<section>
            <NoteCreator addNote={addNote} />
            <NoteFilter onSetFillter={onSetFillter} />
            <NoteList notes={notes} editNote={editNote} removeNote={removeNote} addNote={addNote} />
    </section>)

}
