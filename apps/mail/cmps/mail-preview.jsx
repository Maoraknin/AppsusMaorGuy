
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';

export function MailPreview({ mail }) {




    return (
        <Link to={`/mail/${mail.id}`}>
        <tr className={mail.isRead ? "mail-preview read" : "mail-preview"} key={mail.id}>
            <td className="mail-sender">{mail.from}</td>
            <td className="mail-content"><span className="mail-subject">{mail.subject}</span>, <span className="mail-preview-body"> - {mail.body}</span></td>
            <td className="mail-date">{utilService.getDayName(mail.sentAt, "en-US")}</td>
        </tr>
        </Link>
    )
}