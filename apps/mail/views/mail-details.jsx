const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';
import { utilService } from '../../../services/util.service.js';

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch((err) => {
                console.log('Had issues with mail details', err)
                navigate('/mail')
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            navigate('/mail')
        })
            .catch((err) => {
                console.log('Had issues removing', err)
                showErrorMsg('Could not delete mail, try again please!')
            })
    }


    return (
        <section className="mail-container">
           {mail && <div className="mail-info-container">
            <h2>{mail.subject}</h2>
            <p>{mail.body}</p>
            <h5>{utilService.getFormattedDate(mail.sentAt)}</h5>
            <h5>to: {mail.to}</h5>
            <Link to={`/mail`}>Go Back</Link>
            <button onClick={() => onRemoveMail(mail.id)}>Delete mail</button>
            </div>}
        </section>
    )

}
