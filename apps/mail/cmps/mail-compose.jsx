


export function MailCompose() {
    return <div className="compose-modal">
        <div className="compose-header">New Messege</div>
        <form className="compose-form">
            <input type="text"
                id="to"
                name="to"
                placeholder="To"
            />
            <input type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
            />
            <textarea
                className="compose-textarea"
                name="body"
                id="body">

            </textarea>
        </form>

    </div>
}