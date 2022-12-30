const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type, checked } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => {
            if (type === 'checkbox') {
                console.log('checked:', checked)
                return { ...prevFilter, [field]: checked }
            }
            return { ...prevFilter, [field]: value }
        })
    }


    return <section className="book-filter full main-layout">
        <h1 className="filter-title">Find your book!</h1>
        <form className="filter-form">
            <div className="input-container">
                <label htmlFor="title">title:</label>
                <input type="text"
                    id="title"
                    name="title"
                    placeholder="By title"
                    value={filterByToEdit.title}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="authors">Authors:</label>
                <input type="text"
                    id="authors"
                    name="authors"
                    placeholder="By authors"
                    value={filterByToEdit.authors}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="minPrice">Min price:</label>
                <input type="number"
                    id="minPrice"
                    name="minPrice"
                    placeholder="By min-price"
                    value={filterByToEdit.minPrice}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="isSale">On SALE</label>
                <input type="checkbox"
                    id="isSale"
                    name="isSale"
                    onChange={handleChange}
                />
            </div>

        </form>

    </section>
}