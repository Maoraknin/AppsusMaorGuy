const { useState, useEffect } = React


import { BookFilter } from '../cmps/book-filter.jsx';
import { BookList } from '../cmps/book-list.jsx';

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';
import { bookService } from '../services/book.service.js';

export function BookIndex() {

    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then((books) => {
            setBooks(books)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            // eventBusService.emit('show-user-msg', {txt: 'CarRemoved', type: 'success'})
            showSuccessMsg('Book removed')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove book, try again please!')
            })
    }


    return (
        <section className="book-index">
           <div className="main-layout">
            <h1 className="book-title">Appsus book shop</h1>
                <BookFilter onSetFilter={onSetFilter} />

                {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook}/>}
                {!isLoading && !books.length && <div>No more books in the shop...</div>}
                {isLoading && <div>LOADING</div>}
            
            
            </div>

        </section>
    )
}