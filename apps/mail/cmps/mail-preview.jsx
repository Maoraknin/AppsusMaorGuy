
const { Fragment, useState } = React
const { Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js';
import { mailService } from '../services/mail.service.js';

export function MailPreview({ mail, setStared, removeMail, setReadMail, setToggleRead }) {

    const [isExpanded, setIsExpanded] = useState(false)

    function onRemoveMail(ev) {
        ev.stopPropagation()
        removeMail(mail)
        
    }

    function onToggleRead(ev){
        ev.stopPropagation()
        setToggleRead(mail)
    }

    function onSetStared(ev){
        ev.stopPropagation()
        setStared(mail)
    }

    function onEnterMail(ev){
        ev.stopPropagation()
        setReadMail(mail)
    }

    return (
       <Fragment>
            <tr onClick={() => setIsExpanded(!isExpanded)} className={mail.isRead ? "mail-preview read" : "mail-preview"} key={mail.id}>
                <td className={ mail.isRead ? "mail-sender read" : "mail-sender"}><span onClick={onSetStared} className={mail.isStared ? "material-symbols-outlined icon stared" : "material-symbols-outlined icon"}>star</span> {mail.from} </td>
                <td className="mail-content"><span className={mail.isRead ? "mail-subject read" : "mail-subject"}>{mail.subject}</span> <span className="mail-preview-body"> - {mail.body}</span></td>
                <td className={mail.isRead ? "mail-date read" : "mail-date"}>{utilService.getFormattedDay(mail.sentAt)} {utilService.getMonthName(mail.sentAt)}</td>
                <td className="mail-actions">
                    <span onClick={(ev) => onRemoveMail(ev)} className="material-symbols-outlined icon">delete</span>
                    <span onClick={(ev) => onToggleRead(ev)} className="material-symbols-outlined icon">{mail.isRead ? 'mail' : 'drafts'}</span>
                </td>
            </tr>
            <tr hidden={!isExpanded}>
            <td colSpan="3" className="mail-hidden-container">
                <h2>{mail.subject}</h2>
                <Link onClick={onEnterMail} to={`/mail/${mail.id}`}><span className="material-symbols-outlined fullscreen">fullscreen</span></Link>
                <div className="flex space-between">
                    <h5>from: {mail.from} <span className="details-email">{`<${mail.fromEmail}>`}</span></h5>
                    <h5 className="details-date">{utilService.getFormattedDate(mail.sentAt)}</h5>
                </div>
                <p>{mail.body}</p>
            </td>
        </tr>
            </Fragment>
       
    )
}

{/* <Link onClick={onEnterMail} to={`/mail/${mail.id}`}>
 */}