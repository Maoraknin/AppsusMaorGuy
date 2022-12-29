
const { useState, useEffect } = React

import { MailFilter } from '../cmps/mail-filter.jsx';
import { MailFolderList } from '../cmps/mail-folder-list.jsx';
import { MailList } from '../cmps/mail-list.jsx';
import { MailCompose } from '../cmps/mail-compose.jsx';

import { mailService } from '../services/mail.service.js';

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isComposeClicked, setIsComposeClicked] = useState(false)

    useEffect(() => {
        loadMails()
    }, [filterBy, mails])

    function loadMails() {
        mailService.query(filterBy).then((mails) => {
            setMails(mails)
        })
    }

    function onSetFilter(filterByFromFilter){
        setFilterBy(filterByFromFilter)
    }

    function addMail(newMail){
        mailService.save(newMail).then((mail) => {
            mails.unshift(mail)
            setMails(mails)
        })
    }

    function onToggleCompose(){
        setIsComposeClicked(!isComposeClicked)
    }

    function setStared(mail){
        mail.isStared = !mail.isStared
        mailService.save(mail)
    }

    function removeMail(mail){
        if(mail.status === 'trash'){
            mailService.remove(mail.id)
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not delete mail, try again please!')
            })
        }else{
            mail.status = 'trash'
            mailService.save(mail)
        }
        
    }

    function setReadMail(mail){
        mail.isRead = false
        mailService.save(mail)
        

    }

    function setToggleRead(mail){
        mail.isRead = !mail.isRead
        mailService.save(mail)
    }


    return <main className="mail-index-container">
        <MailFilter onSetFilter={onSetFilter}/>
        <section className="mail-container">
            <MailFolderList onSetFilter={onSetFilter} onToggleCompose={onToggleCompose}/>
            <MailList mails={mails} setStared={setStared} removeMail={removeMail} onSetFilter={onSetFilter} setReadMail={setReadMail} setToggleRead={setToggleRead}/>
           {isComposeClicked && <MailCompose addMail={addMail} onToggleCompose={onToggleCompose}/>}
        </section>
    </main>
}

