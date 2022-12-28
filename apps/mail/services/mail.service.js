
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
  getDefaultFilter,
  // addReview,
  // getNextBookId,
  // getPrevBookId
}



// function query() {
//     return storageService.query(MAIL_KEY) 
//   }


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


function query(filterBy) {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      if (filterBy.subject) {
        const regex = new RegExp(filterBy.subject, 'i')
        mails = mails.filter(mail => regex.test(mail.subject))
      }
      if (filterBy.isRead !== '') {
        mails = mails.filter(mail => {
          return mail.isRead === filterBy.isRead
        })
      }
      if (filterBy.isStared) {
        mails = mails.filter(mail => {
          console.log('mail.isStared:',mail.isStared)
          return mail.isStared
        })
      }
      if (filterBy.status) {
        mails = mails.filter(mail => {
          console.log('mail.status === filterBy.status:', mail.status === filterBy.status)
          return mail.status === filterBy.status
        })
      }
      return mails
    })
}

function getDefaultFilter() {
  return { subject: '', isRead: '' }
}


function _createMails() {
  let mails = utilService.loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    mails = [
      {
        id: 'e101',
        subject: 'Miss you!',
        from: 'Maor',
        fromEmail: 'maoraknin125@gmail.com',
        body: 'Would like to catch up sometimes i missed you you stupid little man how are you ',
        isRead: false,
        sentAt: 1672228849000,
        to: 'momo@momo.com',
        status: 'inbox',
        isStared: true
      },
      {
        id: 'e102',
        subject: 'Love you!',
        from: 'Maor',
        fromEmail: 'maoraknin125@gmail.com',
        body: 'Would LOVE to catch up sometimes',
        isRead: true,
        sentAt: 1672056049000,
        to: 'momo@momo.com',
        status: 'inbox',
        isStared: false
      },
      {
        id: 'e103',
        subject: 'Fuck you!',
        from: 'Maor',
        fromEmail: 'maoraknin125@gmail.com',
        body: 'Would NOT want to catch up sometimes',
        isRead: false,
        sentAt: 1671883249000,
        to: 'momo@momo.com',
        status: 'sent',
        isStared: false
      },
      {
        id: 'e104',
        subject: 'Hey you!',
        from: 'Maor',
        fromEmail: 'maoraknin125@gmail.com',
        body: 'How you Doin',
        isRead: true,
        sentAt: 1671883239000,
        to: 'momo@momo.com',
        status: 'inbox',
        isStared: true
      },
      {
        id: 'e105',
        subject: 'not you!',
        from: 'Maor',
        fromEmail: 'maoraknin125@gmail.com',
        body: 'wrong email... i am a long long span to check if the css shit is still working and how is it',
        isRead: true,
        sentAt: 1671883149000,
        to: 'momo@momo.com',
        status: 'sent',
        isStared: true
      }

    ]
  }
  utilService.saveToStorage(MAIL_KEY, mails)
}