const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

export function MailFolderList({ onSetFilter, onToggleCompose }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCheckedStar, setIsCheckedStar] = useState(false)

    useEffect(() => {
        onSetFilter(filterBy)
    }, [filterBy, isCheckedStar])

    function onSetListFilter(value) {
        onStarFilter(false)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, status: value }
        })
    }

    function onStarFilter(isFilterOn) {
        setIsCheckedStar(isFilterOn)
        setFilterBy((prevFilter) => {
            return { ...prevFilter, isStared: isFilterOn, status:'' }
        })
    }

    return <div className="side-bar-container">
        <button className="compose-btn" onClick={onToggleCompose}><span className="material-symbols-outlined">edit</span>Compose</button>
        <ul className="folder-list-container">
            <li onClick={() => onSetListFilter(null)} className={filterBy.status === null ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">mail</span>All</li>
            <li onClick={() => onSetListFilter('inbox')} className={filterBy.status === 'inbox' ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">inbox</span>Inbox</li>
            <li onClick={() => onSetListFilter('sent')} className={filterBy.status === 'sent' ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">send</span>Sent</li>
            <li onClick={() => onStarFilter(!isCheckedStar)} className={isCheckedStar ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">star</span>Stared</li>
        </ul>
    </div>
}