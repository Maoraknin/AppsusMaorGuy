const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

import { mailService } from '../services/mail.service.js';

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
    console.log('mail:', mail)

    return (
        <section className="mail-container">
           {mail && <div className="mail-info-container">
            <h2>{mail.subject}</h2>
            <p>{mail.body}</p>
            <h5>today</h5>
            <h5>to: {mail.to}</h5>
            </div>}

            Hey
        </section>
    )

}
