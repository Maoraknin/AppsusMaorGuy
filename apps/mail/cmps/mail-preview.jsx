
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';
import { mailService } from '../services/mail.service.js';

export function MailPreview({ mail, setStared, removeMail }) {

    function onRemoveMail(ev, mailId) {
        ev.stopPropagation()
        removeMail(mailId)
        
    }

    function onSetStared(){
        setStared(mail)
    }

    // WORK
    // WORK
    // WORK
    // WORK
    // WORK
    // WORK
    // WORK
    // WORK
    // WORK
    // WORK


    return (
       
            <tr className={mail.isRead ? "mail-preview read" : "mail-preview"} key={mail.id}>
                <td className={ mail.isRead ? "mail-sender read" : "mail-sender"}><span onClick={onSetStared} className={mail.isStared ? "material-symbols-outlined icon stared" : "material-symbols-outlined icon"}>star</span> <Link to={`/mail/${mail.id}`}>{mail.from} </Link></td>
                <td className="mail-content"><Link to={`/mail/${mail.id}`}><span className={mail.isRead ? "mail-subject read" : "mail-subject"}>{mail.subject}</span> <span className="mail-preview-body"> - {mail.body}</span></Link></td>
                <td className={mail.isRead ? "mail-date read" : "mail-date"}>{utilService.getFormattedDay(mail.sentAt)} {utilService.getMonthName(mail.sentAt)}</td>
                <td className="mail-actions">
                    <span onClick={(ev) => onRemoveMail(ev, mail.id)} className="material-symbols-outlined icon">delete</span>
                </td>
            </tr>
       
    )
}