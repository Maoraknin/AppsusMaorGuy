export function NotePreview({ note }) {

  return (
    <div className="memo" key={note.id}>

      <h4>{note.id}</h4>
      <h4>{note.type}</h4>
      </div>
  )
}
