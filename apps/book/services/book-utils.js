export const bookUtils = {
    getReadingLvl,
    getPublishedData,
    getPriceColor,
    getPriceToDisplay
}


function getReadingLvl(pageCount){
    if(pageCount > 500) return 'Serious Reading'
    else if(pageCount > 500) return 'Descent Reading'
    else if(pageCount < 500) return 'Light Reading'
}

function getPublishedData(date){
    const currYear = new Date(Date.now()).getYear()
    const publishedYear = new Date(`January 1, ${date} 00:00:00`).getYear()
    if((currYear - publishedYear) > 10) return 'Vintage, '
    if((currYear - publishedYear) <= 2) return 'New, '
}

function getPriceColor(price){
    if(price > 150) return 'red'
    else if(price < 20) return 'green'
    else return ''
}

function getPriceToDisplay(amount,currencyCode){
    const formatter = new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: currencyCode,
      
      });
      
     return(formatter.format(amount))
}