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
        if(value === 'false') value = false
        else if(value === 'true') value = true
        setFilterBy((prevFilter) => {
           console.log('value:',value)
            return { ...prevFilter, [field]: value }
        })
    }


    return <section className="mail-filter">
        <form className="filter-form">
            <div className="input-container">
                <label htmlFor="subject">Subject:</label>
                <input type="text"
                    id="subject"
                    name="subject"
                    placeholder="By subject"
                    value={filterBy.subject}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <label htmlFor="isRead"></label>

                <select name="isRead" id="isRead" onChange={handleChange}>
                    <option value=''>All</option>
                    <option value={false}>unread</option>
                    <option value={true}>read</option>
                </select>
            </div>
            {/* <div className="input-container">
                <label htmlFor="isRead">is Read</label>
                <input type="checkbox"
                    id="isRead"
                    name="isRead"
                    onChange={handleChange}
                />
            </div> */}
        </form>
    </section >
}