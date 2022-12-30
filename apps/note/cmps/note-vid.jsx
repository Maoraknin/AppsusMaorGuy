



export function NoteVideo({ note }) {
  let idx = note.info.url.indexOf('=')
  const urlCode = note.info.url.substring(idx + 1)
  const newUrl = `https://www.youtube.com/embed/${urlCode}`
  return (<div className="note">
    <iframe src={newUrl} height="200" width="300" title="Iframe Example"></iframe>
  </div>)
}
