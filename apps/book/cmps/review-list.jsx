
import { ReviewPriview } from '../cmps/review-priview.jsx';

export function ReviewList({ book, onRemoveReview }) {
   return <div className="review-list">
    {book.reviews.map((review) =>{ 
    return <ReviewPriview key={review.id} review={review} onRemoveReview={onRemoveReview}/>
    })}

    </div>

}

