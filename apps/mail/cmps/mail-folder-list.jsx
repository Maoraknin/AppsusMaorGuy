const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFolderList({ onSetFilter }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCheckedStar, setIsCheckedStar] = useState(false)

    useEffect(() => {
        console.log(filterBy);
        onSetFilter(filterBy)
    }, [filterBy, isCheckedStar])

    function onSetListFilter(value) {
        setFilterBy((prevFilter) => {
            console.log('value:', value)
            return { ...prevFilter, status: value }
        })
    }

    function onStarFilter(isFilterOn) {
        setIsCheckedStar(isFilterOn)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, isStared: isFilterOn }
        })
    }

    return <div className="side-bar-container">
        <button className="compose-btn"><span className="material-symbols-outlined">edit</span>Compose</button>
        <ul className="folder-list-container">
            <li onClick={() => onSetListFilter('inbox')} className="folder-list-item"><span className="material-symbols-outlined icon">inbox</span>Inbox</li>
            <li onClick={() => onStarFilter(!isCheckedStar)} className="folder-list-item"><span className="material-symbols-outlined icon">star</span>Stared</li>
            <li onClick={() => onSetListFilter('sent')} className="folder-list-item"><span className="material-symbols-outlined icon">send</span>Sent</li>
            <li onClick={() => onSetListFilter(null)} className="folder-list-item"><span className="material-symbols-outlined icon">mail</span>All</li>
        </ul>
    </div>
}