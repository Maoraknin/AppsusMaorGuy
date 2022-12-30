const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React


import { bookService } from '../services/book.service.js'
import { AddReview } from '../cmps/add-review.jsx';
import { BookDetailsContainer } from '../cmps/book-details-container.jsx';
import { ReviewList } from '../cmps/review-list.jsx';
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';


export function BookDetails() {
    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const { bookId } = useParams()
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])


    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch((err) => {
                console.log('Had issues with car details', err)
                navigate('/book')
            })

        bookService.getNextBookId(params.bookId)
            .then(setNextBookId)

        bookService.getPrevBookId(params.bookId)
            .then(setPrevBookId)
    }

    function onGoBack() {
        navigate('/book')
    }

    function onRemoveReview(reviewId) {
        const idx = book.reviews.findIndex(reviews => reviews.id === reviewId)
        book.reviews.splice(idx, 1)
        bookService.save(book)
            .then(() => {
                showSuccessMsg('Book removed')
                setBook({ ...book })
            })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not remove book, try again please!')
            })
    }

    function saveReview(book, bookReview){
        bookService.addReview(book.id, bookReview)
        .then((updatedBook) => {
            showSuccessMsg('Book review added')
            setBook({ ...updatedBook })
        }).catch((err) => {
            console.log('Had issues adding review', err)
            showErrorMsg('Could not add book review, try again please!')
        })
    }

    

    if (!book) return <div>Loading...</div>
    return (

        <section className="book-details">
            <div className="datails-main-container">
            <BookDetailsContainer book={book} />

            <span onClick={onGoBack} class="material-symbols-outlined close-book-details">close</span>
            
            <AddReview book ={book} saveReview={saveReview} />
            
            {!book.reviews && <h4>No Reviews</h4>}
            {book.reviews && <h4>{book.reviews.length} Reviews</h4>}
            {book.reviews && <ReviewList book={book} onRemoveReview={onRemoveReview} />}

            <div className="details-book-nav">
            <Link to={`/book/${prevBookId}`} className="flex"><span class="material-symbols-outlined">arrow_back</span>Previous Book</Link>
            <Link to={`/book/${nextBookId}`} className="flex">Next Book<span class="material-symbols-outlined">arrow_forward</span></Link>
            </div>

            </div>
        </section>
    )
}

