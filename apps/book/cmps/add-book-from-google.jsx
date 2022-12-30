
const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js';
import { googleService } from '../services/google.service.js';
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';
import { utilService } from '../../../services/util.service.js';



export function AddBookFromGoogle() {
    // const [addedGoogleBook, setAddedGoogleBook] = useState('')
    const [books, setBooks] = useState([])
    const navigate = useNavigate()
    const debounceLoadFromGoogle = useRef(null)

    useEffect(() => {
        loadBooksFromGoogle()
        console.log('here');
        debounceLoadFromGoogle.current = utilService.debounce(loadBooksFromGoogle)
        console.log(books);
    }, [])



    // function googleHandleChange(txt = '') {
    //     console.log('txt:',txt)
    //     setAddedGoogleBook(txt)
    //     console.log('googleService.getBooksAsPromise():', googleService.getBooksAsPromise(addedGoogleBook))
    //     googleService.getBooksAsPromise(addedGoogleBook)
    //         .then(res => res.data)
    //         .then(res => res.items)
    //         .then(setBooks)
    // }

    function loadBooksFromGoogle(txt = '') {
        // setAddedGoogleBook(txt)
        googleService.query(txt)
            .then((books) => {
                setBooks(books)
            })
            .catch(err => {
                console.log('Had issues in book details:', err)
                navigate('/book')
            })
    }

    function googleHandleChange(txt) {
        debounceLoadFromGoogle.current(txt)
    }





    function onAddGoogleBook(book) {
        bookService.save(book).then(() => {
            navigate('/book')
            showSuccessMsg('Book Added')
        }).catch((err) => {
            console.log('Had issues adding', err)
            showErrorMsg('Could not add book, try again please!')
        })

    }

    return <section className="google-add-books">
        <h2 className="add-book-title">Enter Book Title: </h2>
        <form className="google-add-form">
            <label htmlFor="title">Title : </label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter title..."
                onChange={(event) => googleHandleChange(event.target.value)}
            />
        </form>

        <ul className="google-book-list">
            {books.map(book => {
                return <li><span>{book.title}</span><span onClick={() => onAddGoogleBook(book)} class="material-symbols-outlined add-google-book-btn">add_circle</span></li>
            })}
        </ul>
    </section>
}

