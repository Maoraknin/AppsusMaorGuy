
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';

export function MailPreview({ mail }) {




    return (
        <Link to={`/mail/${mail.id}`}>
        <tr className={mail.isRead ? "mail-preview read" : "mail-preview"} key={mail.id}>
            <td className={mail.isRead ? "mail-sender read" : "mail-sender"}>{mail.from}</td>
            <td className="mail-content"><span className={mail.isRead ? "mail-subject read" : "mail-subject"}>{mail.subject}</span> <span className="mail-preview-body"> - {mail.body}</span></td>
            <td className={mail.isRead ? "mail-date read" : "mail-date"}>{utilService.getFormattedDate(mail.sentAt)}</td>
            <td className="mail-actions">Features</td>
        </tr>
        </Link>
    )
}