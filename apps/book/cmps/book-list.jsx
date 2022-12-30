
const { Link } = ReactRouterDOM

import { BookPreview } from "./book-preview.jsx";

export function BookList({ books, onRemoveBook }) {
    return (
        <section>
            <ul className="book-list">
                <li key={'add-book'} className="add-book-container">
                <Link to={`/book/add`}><img src='assets/img/add-book.png' /></Link>
                    <h2 className="book-preview-title">Add new book to our shop!</h2>
                </li>
                {
                    books.map(book => <li key={book.id}>
                        <BookPreview book={book} />
                        <div>
                            <span onClick={() => onRemoveBook(book.id)} class="material-symbols-outlined">delete</span>

                        </div>
                    </li>)
                }
            </ul>
        </section>
    )
}