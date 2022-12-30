

export function ReviewPriview({ review, onRemoveReview }) {
    return <ul key={review.id} className="review">
        <h4>Full Name: {review.name}</h4>
        <h4>Rating: {'⭐'.repeat(review.rating)}</h4>
        <h4>Read at: {review.date}</h4>
        <button className="review-btn" onClick={() => onRemoveReview(review.id)}>Delete review</button>
    </ul>

}





