
import { utilService } from '../../../services/util.service.js';

export const googleService = {
    getBookToAdd,
    query
    // getBooksAsPromise
}

    const googleBookAPI = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction%20power&key=AIzaSyCB0AieRfE8jFeAQWL8okf7J69APWc8VTI`


// function getBooksAsPromise(addedGoogleBook){
//     const googleBookAPI = `https://www.googleapis.com/books/v1/volumes?q=${addedGoogleBook}&maxResults=12&key=AIzaSyCB0AieRfE8jFeAQWL8okf7J69APWc8VTI`
//    return axios.get(googleBookAPI)
// }

function query(txt){
    return axios.get(googleBookAPI).then(books => { 
        let newBooks = books.data.items.map(book => getBookToAdd(book))
        if(txt){
            const regex = new RegExp(txt, 'i')
            newBooks = newBooks.filter(book => regex.test(book.title))
        }
        console.log('newBooks:',newBooks)
        return newBooks
    })
 }


function getBookToAdd(book){
    const info = book.volumeInfo
         return {
                title: info.title,
                subtitle: info.subtitle,
                authors: info.authors,
                publishedDate: info.publishedDate,
                description: info.description,
                pageCount: info.pageCount,
                categories: info.categories,
                thumbnail: info.imageLinks.thumbnail,
                language: info.en,
                listPrice: {
                    amount: utilService.getRandomIntInclusive(30,100),
                    currencyCode: 'USD',
                    isOnSale: false
                },
            }
}