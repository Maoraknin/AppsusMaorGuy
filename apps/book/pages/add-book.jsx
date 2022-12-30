const { useState } = React



import { AddUserBook } from '../cmps/add-user-book.jsx';
import { AddBookFromGoogle } from '../cmps/add-book-from-google.jsx';



export function AddBook() {

    const [addBookFromGoogle, setAddBookFromGoogle] = useState(false)
    // const[addUserBook, setAddUserBook] = useState(false)

    return <div className="add-main-container">
        <div className="add-container flex">

            <div className="add-info-container">
                {!addBookFromGoogle && <AddUserBook />}
                {addBookFromGoogle && <AddBookFromGoogle />}
            </div>


            <div className="add-from-btn-container">
                <button onClick={() => setAddBookFromGoogle(true)}>Add From Google</button>
                <button onClick={() => setAddBookFromGoogle(false)}>Add Manually</button>
            </div>
        </div>
    </div>





    // 

















}
