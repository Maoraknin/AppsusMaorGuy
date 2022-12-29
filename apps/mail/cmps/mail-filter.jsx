const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFilter({ onSetFilter }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        console.log(filterBy);
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange({ target }) {
        let { value, name: field} = target
        setFilterBy((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }


    return <section className="mail-filter">
        <form className="filter-form">
                <input type="text"
                    id="txt"
                    name="txt"
                    className="search-input"
                    placeholder="Search mail"
                    value={filterBy.txt}
                    onChange={handleChange}
                />
        </form>
    </section >
}