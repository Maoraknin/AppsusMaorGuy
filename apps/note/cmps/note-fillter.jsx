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
    <form className="text-filter-form" onSubmit={onSubmitFillter}>
      <input className="input-filter" type="text" id="txt"
        name="txt"
        placeholder="Please text to filter "
        onChange={handleTypeChange}
        value={FillterByEdit.txt} />
      <button className="fillterBtn" type="submit"><span class="material-symbols-outlined">filter_list</span></button>
    </form>

    <select onChange={onChangeType}>
      <option value=''>All</option>
      <option value='note-txt'>Text</option>
      <option value='note-img'>Image</option>
      <option value='note-vid'>Video</option>
      <option value='note-todos'> Todos</option>
    </select>
  </section>
  )
}