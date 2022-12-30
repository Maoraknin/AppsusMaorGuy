

import { BookPreview } from "./book-preview.jsx";

export function BookList({books, onRemoveBook}) {
    return (
        <section>
            <ul className="book-list">
                {
                    books.map(book => <li key={book.id}>
                        <BookPreview book={book} />
                        <div>
                            <span onClick={() => onRemoveBook(book.id)} class="material-symbols-outlined">delete</span>
                            {/* <button onClick={() => onSelectBook(book.id)}>Read More</button> */}
                            
                        </div>
                    </li>)
                }
            </ul>
        </section>
    )
}