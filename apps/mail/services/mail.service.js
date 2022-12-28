
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'


const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    // getEmptyBook,
    // getDefaultFilter,
    // addReview,
    // getNextBookId,
    // getPrevBookId
  }



function query() {
    return storageService.query(MAIL_KEY) 
  }


  function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
  }
  
  function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
  }
  
  function save(mail) {
    if (mail.id) return storageService.put(MAIL_KEY, mail)
    else return storageService.post(MAIL_KEY, mail)
  }


// function query(filterBy) {
//     return storageService.query(BOOK_KEY)
//       .then(books => {
//         if (filterBy.title) {
//           const regex = new RegExp(filterBy.title, 'i')
//           books = books.filter(book => regex.test(book.title))
//         }
//         if (filterBy.authors) {
//           const regex = new RegExp(filterBy.authors, 'i')
//           books = books.filter(book => book.authors.some(author => regex.test(author)))
//         }
  
//         if (filterBy.minPrice) {
//           books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
//         }
//         if (filterBy.isSale) {
//           books = books.filter(book => book.listPrice.isOnSale === filterBy.isSale)
//         }
//         return books
//       })
//   }


function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                from: 'Maor',
                body: 'Would like to catch up sometimes',
                isRead: false,
                sentAt: 1551133934321,
                to: 'momo@momo.com'
            },
            {
                id: 'e102',
                subject: 'Love you!',
                from: 'Maor',
                body: 'Would LOVE to catch up sometimes',
                isRead: true,
                sentAt: 1551133930594,
                to: 'momo@momo.com'
            },
            {
                id: 'e103',
                subject: 'Fuck you!',
                from: 'Maor',
                body: 'Would NOT want to catch up sometimes',
                isRead: false,
                sentAt: 1551133931234,
                to: 'momo@momo.com'
            }

        ]
    }
    utilService.saveToStorage(MAIL_KEY, mails)
}