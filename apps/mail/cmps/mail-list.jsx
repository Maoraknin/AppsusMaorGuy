
import { MailPreview } from "./mail-preview.jsx";
import { MailTableHeader } from "./mail-table-header.jsx";

export function MailList({mails, setStared, removeMail, onSetFilter, setReadMail, setToggleRead}) {

    return (
        <section>
            <table className="mail-table">
                <MailTableHeader onSetFilter={onSetFilter}/>
                <tbody>
                {mails.map(mail => <MailPreview mail={mail} setStared={setStared} removeMail={removeMail} setReadMail={setReadMail} setToggleRead={setToggleRead} />)}
                </tbody>
            </table>
        </section>
    )

}
