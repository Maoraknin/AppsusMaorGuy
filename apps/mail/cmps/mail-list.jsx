
import { MailPreview } from "./mail-preview.jsx";

export function MailList({mails}) {

    return (
        <section>
            <table className="mail-table">
                <tbody>
                {mails.map(mail => <MailPreview mail={mail} />)}
                </tbody>
            </table>
        </section>
    )

}
