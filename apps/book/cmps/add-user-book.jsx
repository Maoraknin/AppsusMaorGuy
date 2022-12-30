

const { useState, useEffect } = React
const { useNavigate, Link } = ReactRouterDOM

import { bookService } from '../services/book.service.js';
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js';


export function AddUserBook() {

    
  const [addedBook, setAddedBook] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if(type === 'checkbox') value = target.checked
        setAddedBook((prevBook) =>{
            if(field === 'amount' || field === 'currencyCode' || field === 'isOnSale'){
                return { ...prevBook, listPrice: {...prevBook.listPrice, [field]: value}}
            }

           return { ...prevBook, [field]: value }

        } )
    }

    function onAddBook(ev){
        ev.preventDefault()
        if(addedBook.authors.length) addedBook.authors = addedBook.authors.split(',')
        if(addedBook.categories.length) addedBook.categories = addedBook.categories.split(',')
        if(!addedBook.thumbnail) addedBook.thumbnail = '../assets/img/default.jpg'
        bookService.save(addedBook).then(() => {
            navigate('/book')
            showSuccessMsg('Book Added')
        }).catch((err) => {
            console.log('Had issues adding', err)
            showErrorMsg('Could not add book, try again please!')
        })

    }


    return <section className="add-book">
        <h2 className="add-book-title">Add new book to our App!</h2>
        <form onSubmit={onAddBook} className="add-book-form">
            <div>
                <label htmlFor="title">Title : </label>
                <input type="text"
                    name="title"
                    id="title"
                    placeholder="Enter title..."
                    value={addedBook.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="subtitle">Subtitle : </label>
                <input type="text"
                    name="subtitle"
                    id="subtitle"
                    placeholder="Enter subtitle..."
                    value={addedBook.subtitle}
                    onChange={handleChange}
                />
            </div>
            <div>
            <label htmlFor="authors">Authors : </label>
            <input type="text"
                name="authors"
                id="authors"
                placeholder="Enter authors..."
                value={addedBook.authors}
                onChange={handleChange}
            />
            </div>
           
            <div>
                <label htmlFor="description">Description : </label>
                <input type="text"
                    name="description"
                    id="description"
                    placeholder="Enter description..."
                    value={addedBook.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="pageCount">Page count : </label>
                <input type="number"
                    name="pageCount"
                    id="pageCount"
                    placeholder="Enter number of pages..."
                    value={addedBook.pageCount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="categories">Categories : </label>
                <input type="text"
                    name="categories"
                    id="categories"
                    placeholder="Enter categories..."
                    value={addedBook.categories}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="thumbnail">Cover picture src: </label>
                <input type="url"
                    name="thumbnail"
                    id="thumbnail"
                    placeholder="Enter thumbnail..."
                    value={addedBook.thumbnail}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="language">Language: </label>
                <input type="text"
                    name="language"
                    id="language"
                    placeholder="Enter language..."
                    value={addedBook.language}
                    onChange={handleChange}
                />
            </div>
             <div>
                <label htmlFor="amount">Price: </label>
                <input type="number"
                    name="amount"
                    id="amount"
                    placeholder="Enter price..."
                    value={addedBook.listPrice.amount}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="currencyCode">Currency: </label>
                <input type="text"
                    name="currencyCode"
                    id="currencyCode"
                    placeholder="EUR / ILS / USD"
                    value={addedBook.listPrice.currencyCode}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="publishedDate">Published at : </label>
                <input type="date"
                    name="publishedDate"
                    id="publishedDate"
                    placeholder="Enter publish date..."
                    value={addedBook.publishedDate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="isOnSale">On sale?: </label>
                <input type="checkbox"
                    name="isOnSale"
                    id="isOnSale"
                    placeholder="EUR / ILS / USD"
                    value={addedBook.listPrice.isOnSale}
                    onChange={handleChange}
                />
            </div>
            <div className="add-actions-container">
                <button className="add-book-btn">Add Book!</button>
                <Link to="/book">Cancel</Link>
                {/* <button type="button"></button> */}
            </div>

        </form>

    </section>

}
