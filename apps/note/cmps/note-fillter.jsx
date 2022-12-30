import { noteService } from "../services/note.service.js";
const { useState } = React;




export function NoteFilter({ onSetFillter }) {
  const [FillterByEdit, setFillterByEdit] = useState(noteService.getDefaultFillter)
  // console.log(FillterByEdit)

  function handleTypeChange(ev) {
    const { value } = ev.target
    setFillterByEdit((prevFillter) => {
      return { ...prevFillter, txt: value }
    })
    console.log(FillterByEdit)
  }

  function onSubmitFillter(ev) {
    ev.preventDefault()
    onSetFillter(FillterByEdit)
  }

  function onChangeType({ target }) {
    console.log(FillterByEdit)
    onSetFillter({ ...FillterByEdit, noteType: target.value })
  }


  return (<section className="note-fillter">
    <form onSubmit={onSubmitFillter}>
      <label htmlFor="note-type">Type:</label>
      <input type="text" id="txt"
        placeholder="Please enter note type"
        onChange={handleTypeChange}
        value={FillterByEdit.txt} />
      <button type="submit">Fillter notes!</button>
    </form>

    <select onChange={onChangeType}>
      <option value='note-txt'>Text</option>
      <option value='note-img'>Image</option>
      <option value='note-vid'>Video</option>
      <option value='note-todos'> Todos</option>
    </select>
  </section>
  )
}