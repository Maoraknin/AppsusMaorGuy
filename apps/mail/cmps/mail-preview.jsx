
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';
import { mailService } from '../services/mail.service.js';

export function MailPreview({ mail }) {

    function onRemoveMail(ev, mailId) {
        ev.stopPropagation()
        mailService.remove(mailId).then(() => {
            navigate('/mail')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not delete mail, try again please!')
            })
    }


    return (
       
            <tr className={mail.isRead ? "mail-preview read" : "mail-preview"} key={mail.id}>
                <td className={mail.isRead ? "mail-sender read" : "mail-sender"}> <Link to={`/mail/${mail.id}`}>{mail.from} </Link></td>
                <td className="mail-content"><Link to={`/mail/${mail.id}`}><span className={mail.isRead ? "mail-subject read" : "mail-subject"}>{mail.subject}</span> <span className="mail-preview-body"> - {mail.body}</span></Link></td>
                <td className={mail.isRead ? "mail-date read" : "mail-date"}>{utilService.getFormattedDate(mail.sentAt)}</td>
                <td className="mail-actions">
                    <span onClick={(ev) => onRemoveMail(ev, mail.id)} class="material-symbols-outlined icon">delete</span>
                </td>
            </tr>
       
    )
}