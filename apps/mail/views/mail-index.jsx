
const { useState, useEffect } = React

import { MailFilter } from '../cmps/mail-filter.jsx';
import { MailFolderList } from '../cmps/mail-folder-list.jsx';
import { MailList } from '../cmps/mail-list.jsx';
import { MailCompose } from '../cmps/mail-compose.jsx';

import { mailService } from '../services/mail.service.js';

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy).then((mails) => {
            setMails(mails)
        })
    }

    function onSetFilter(filterByFromFilter){
        setFilterBy(filterByFromFilter)
    }


    return <main className="mail-index-container">
        <MailFilter onSetFilter={onSetFilter}/>
        <section className="mail-container">
            <MailFolderList onSetFilter={onSetFilter}/>
            <MailList mails={mails} />
            <MailCompose />
        </section>
    </main>
}

