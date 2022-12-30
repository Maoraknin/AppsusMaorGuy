
import { bookUtils } from '../services/book-utils.js'
import { LongTxt } from '../cmps/long-text.jsx';


export function BookDetailsContainer({book}) {

    return  (<div className="details-container">
    <img src={book.thumbnail} className="details-img" />
    <div className="book-info-container">
        <h2>{book.title}</h2>
        <h3>{book.subtitle}</h3>
        <p>Author: {book.authors.join(', ')}</p>
        <p>{bookUtils.getPublishedData(book.publishedDate)}{book.publishedDate}</p>
        <LongTxt text={book.description} />
        <p>Categories: {book.categories.join(', ')}</p>
        <p>{bookUtils.getReadingLvl(book.pageCount)} ,{book.pageCount} pages</p>
        <p>Language: {book.language}</p>
        <h3>Price: <span className={bookUtils.getPriceColor(book.listPrice.amount)}>{bookUtils.getPriceToDisplay(book.listPrice.amount, book.listPrice.currencyCode)}</span></h3>
        {book.listPrice.isOnSale && <p className="green">ON SALE!</p>}
    </div>
</div> )
}