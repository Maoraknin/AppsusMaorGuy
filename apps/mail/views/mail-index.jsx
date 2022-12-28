
const { useState, useEffect } = React

import { MailFilter } from '../cmps/mail-filter.jsx';
import { MailFolderList } from '../cmps/mail-folder-list.jsx';
import { MailList } from '../cmps/mail-list.jsx';

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


    return <main>
        <MailFilter onSetFilter={onSetFilter}/>
        <section className="mail-container">
            <MailFolderList />
            <MailList mails={mails} />
        </section>
    </main>
}

