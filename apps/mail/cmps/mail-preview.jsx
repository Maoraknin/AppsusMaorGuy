
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';
import { mailService } from '../services/mail.service.js';

export function MailPreview({ mail, setStared, removeMail, setReadMail, setToggleRead }) {

    function onRemoveMail() {
        removeMail(mail)
        
    }

    function onToggleRead(){
        setToggleRead(mail)
    }

    function onSetStared(){
        setStared(mail)
    }

    function onEnterMail(){
        setReadMail(mail)
    }

    return (
       
            <tr className={mail.isRead ? "mail-preview read" : "mail-preview"} key={mail.id}>
                <td className={ mail.isRead ? "mail-sender read" : "mail-sender"}><span onClick={onSetStared} className={mail.isStared ? "material-symbols-outlined icon stared" : "material-symbols-outlined icon"}>star</span> <Link onClick={onEnterMail} to={`/mail/${mail.id}`}>{mail.from} </Link></td>
                <td className="mail-content"><Link onClick={onEnterMail} to={`/mail/${mail.id}`}><span className={mail.isRead ? "mail-subject read" : "mail-subject"}>{mail.subject}</span> <span className="mail-preview-body"> - {mail.body}</span></Link></td>
                <td className={mail.isRead ? "mail-date read" : "mail-date"}>{utilService.getFormattedDay(mail.sentAt)} {utilService.getMonthName(mail.sentAt)}</td>
                <td className="mail-actions">
                    <span onClick={() => onRemoveMail()} className="material-symbols-outlined icon">delete</span>
                    <span onClick={() => onToggleRead()} className="material-symbols-outlined icon">{mail.isRead ? 'mail' : 'drafts'}</span>
                </td>
            </tr>
       
    )
}