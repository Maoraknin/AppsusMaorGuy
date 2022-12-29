
const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailTableHeader({ onSetFilter }) {


    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        console.log(filterBy);
        onSetFilter(filterBy)
    }, [filterBy])

    function handleChange(value) {
        setIsClicked(false)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, isRead: value }
        })
    }

    return <thead>
        

        <th className="mail-table-header" onClick={() => setIsClicked(!isClicked)}><span class="material-symbols-outlined read-filter">list</span>
        {isClicked && <div className="read-filter-modal">
            <p className="read-filter-option" onClick={() => handleChange(null)}>All</p>
            <p className="read-filter-option" onClick={() => handleChange(false)}>Read</p>
            <p className="read-filter-option" onClick={() => handleChange(true)}>Unread</p>

        </div>}
        </th>
    </thead>

}