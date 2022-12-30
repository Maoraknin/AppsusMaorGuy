const { useState, useEffect } = React

import { utilService } from '../../../services/util.service.js';
import { mailService } from '../services/mail.service.js';

export function MailFolderList({ onSetFilter, onToggleCompose, mails }) {

    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isCheckedStar, setIsCheckedStar] = useState(false)
    const [inboxCount, setInboxCount] = useState(0)
    const [readPersent, setReadPersent] = useState(0)
    
    getInboxCount()
    getReadBarPersent()

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
            return { ...prevFilter, isStared: isFilterOn, status: '' }
        })
    }

    function getInboxCount() {
        mailService.getInboxNum().then(setInboxCount)
        
    }

    function getReadBarPersent(){
        mailService.getReadPersent().then((persent) => setReadPersent(persent + '%'))
        
    }

    return <div className="side-bar-container animate__animated animate__slideInLeft">
        <button className="compose-btn" onClick={onToggleCompose}><span className="material-symbols-outlined">edit</span>Compose</button>
        <ul className="folder-list-container">
            <li onClick={() => onSetListFilter('all')} className={filterBy.status === 'all' ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">mail</span>All</li>
            <li onClick={() => onSetListFilter('inbox')} className={filterBy.status === 'inbox' ? "folder-list-item checked inbox" : "folder-list-item inbox"}><span className="material-symbols-outlined icon">inbox</span>Inbox <span>{inboxCount}</span></li>
            <li onClick={() => onSetListFilter('sent')} className={filterBy.status === 'sent' ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">send</span>Sent</li>
            <li onClick={() => onStarFilter(!isCheckedStar)} className={isCheckedStar ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">star</span>Stared</li>
            <li onClick={() => onSetListFilter('trash')} className={filterBy.status === 'trash' ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">delete</span>Trash</li>
            <li onClick={() => onSetListFilter('draft')} className={filterBy.status === 'draft' ? "folder-list-item checked" : "folder-list-item"}><span className="material-symbols-outlined icon">draft</span>Draft</li>
        </ul>
            <div class="persent-bar-container"><div class="persent-bar" style={{width: `${readPersent}`}}>{readPersent}</div></div>
    </div>
}