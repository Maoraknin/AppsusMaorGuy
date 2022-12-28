import { noteService } from "../services/note.service.js"

export function NoteCreator({saveNote}) {

    function onAddText(ev) {
        ev.preventDefault()
        const { target } = ev
        const text = target.txt.value
        const note = noteService.getNoteText(text)
        saveNote(note)
        
       
       
    }

    return <form onSubmit={onAddText}>
        <div>
                <input type="textarea"
                    id="txt"
                    name="txt"
                    placeholder="enter text"
                    // value={filterByToEdit.title}
                    // onChange={handleChange}
                />
            </div>
            <button>Add</button>
    </form>

}