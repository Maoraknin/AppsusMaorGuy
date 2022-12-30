
import { StarRating } from '../cmps/star-rating.jsx';

// import { bookService } from '../services/book.service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
// import { utilService } from '../services/util.service.js';

export function AddReview({book, saveReview}) {

    function onAddReview(ev) {
        ev.preventDefault()
        const { target } = ev
        const name = target.fullname.value
        const rating = getStarRating()
        const date = target.readAt.value
        // const id = utilService.makeId()
        const bookReview = { name, rating, date }
        saveReview(book, bookReview)
       
    }

    function getStarRating(){
        const elStars = document.querySelector('input[name = star]:checked')
        return elStars ? +elStars.value : 0
    }

    


    return (
        <section>
            <h2>Enter Review!</h2>
            <form onSubmit={onAddReview} className="add-book-form">
                <div>
                    <label htmlFor="fullname">Full name : </label>
                    <input type="text"
                        name="fullname"
                        id="fullname"
                        placeholder="Enter fullname..."
                    />
                </div>
             
                <StarRating getStarRating={getStarRating}/>
                {/* <div>
                    <label htmlFor="rating">Rating : </label>
                    <input type="range"
                        name="rating"
                        id="rating"
                        min="1"
                        max="5"
                    />
                </div> */}
                <div>
                    <label htmlFor="readAt">Read at : </label>
                    <input type="date"
                        name="readAt"
                        id="readAt"
                        placeholder="Enter reading date..."
                    />
                </div>

                <button className="review-btn">Add Review</button>
            </form>
        </section>
    )
}