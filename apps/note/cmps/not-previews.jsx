export function NotePreview({ note }) {

  return (
    <article >
      <h4>{note.id}</h4>
      <h4>{note.type}</h4>
    </article>
  )
}
