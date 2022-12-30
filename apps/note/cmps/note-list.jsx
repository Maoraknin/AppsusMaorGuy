import { NotePreview } from "./note-preview.jsx"


export function NoteList({ notes, editNote, removeNote, addNote }) {

    const divideNotes = () => {
        const pinned = []
        const unpinned = []
        for (const note of notes) {
            if (note.isPinned) {
                pinned.push(note)
            } else {
                unpinned.push(note)
            }

        }
        return { pinned, unpinned }
    }
    const { pinned, unpinned } = divideNotes()
    return (
        <div>
            <div className="memo-container">
                {
                    pinned && pinned.length ? pinned.map(note =>
                        <NotePreview
                            key={note.id}
                            note={note} type={note.type} editNote={editNote} removeNote={removeNote} addNote={addNote} />
                    ) : null
                }
            </div>
            <div className="memo-container">
                {
                    unpinned && unpinned.length ? unpinned.map(note =>
                        <NotePreview
                            key={note.id}
                            note={note} type={note.type} editNote={editNote} removeNote={removeNote} addNote={addNote} />
                    ) : null
                }
            </div>
        </div>

    )
}

