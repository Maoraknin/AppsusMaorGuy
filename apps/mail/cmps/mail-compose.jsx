
// import { utilService } from '../../../services/util.service.js';
import { mailService } from '../services/mail.service.js';

export function MailCompose({addMail, onToggleCompose}) {

    function onAddMail(ev){
        ev.preventDefault()
        const {target} = ev
        const newMail = createNewMail(target)
        addMail(newMail)

    }

    function createNewMail(target){
        const newMail = mailService.getEmptyMailToSend()
        newMail.to = target.to.value
        newMail.subject = target.subject.value
        newMail.body = target.body.value
        onToggleCompose()
        return newMail

    }


    return <div className="compose-modal animate__animated animate__slideInUp">
        <div className="compose-header"><p>New Messege</p><span className="close-compose" onClick={onToggleCompose}>X</span></div>
        <form onSubmit={onAddMail} className="compose-form">
            <input type="text"
                id="to"
                name="to"
                placeholder="To"
                className="compose-input"
            />
            <input type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                className="compose-input"
            />
            <textarea
                className="compose-textarea"
                name="body"
                id="body"
                cols="30"
                rows="10">

            </textarea>
            <button className="compose-send-btn">Send</button>
        </form>

    </div>
}