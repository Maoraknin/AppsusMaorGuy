import { NotePreview } from "./not-previews.jsx"


export function NoteList({ notes }) {

    return (
        <div className="memo-container">
            {
                notes.map(note => <div className="memo" key={note.id}>
                    <NotePreview note={note} />
                </div>)
            }
        </div>



        // <section>
        //     <ul >
        //         {
        //             notes.map(note => <li key={note.id}>
        //                 <NotePreview note={note} />
        //                 <div>
        //                     <button>Change Background color</button>
        //                     <button>Pin Memo</button>
        //                     <button>Edit</button>
        //                     <button>Copy</button>
        //                     <button>Delete</button>
        //                     <button>Send as Email</button>
        //                     {/* <Link to={`/book/${book.id}`}>Read More</Link> */}
        //                 </div>
        //             </li>)
        //         }
        //     </ul>
        // </section>
    )
}

