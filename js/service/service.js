'use strict'

var gBooks
_createBooks()



function getBooks(options) {
    const title = options.filterBy.title.toLowerCase()
    const rating = options.filterBy.rating

    var books = gBooks.filter(book => book.title.toLowerCase().includes(title) 
    && book.rating >= rating)

    if(options.sortBy.title) {
        books.sort((book1,book2) => book1.title.localeCompare(book2.title) * options.sortBy.title)
    }
    else if(options.sortBy.price) {
        books.sort((book1,book2) => (book1.price - book2.price) * options.sortBy.price)
    }
    else if(options.sortBy.rating) {
        books.sort((book1,book2) => (book1.rating - book2.rating) * options.sortBy.rating)
    }

    return books
}

function removeBook(id) {
    const idx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(idx, 1)
    _saveBooks()
}

function updateBook(id, price, rating, imgUrl) {
    const book = gBooks.find(book => book.id === id)

    if(price) book.price = price
    if(rating) book.rating = rating
    if(imgUrl) book.imgUrl = `img/${imgUrl}.jpeg`

    _saveBooks()
    return book
}

function readBook(id) {
    const book = gBooks.find(book => book.id === id)
    return book
}

function addBook(title, price, rating, imgUrl) {
    gBooks.unshift(
        {
            id: makeId(),
            title: title,
            price: price,
            imgUrl: `img/${imgUrl}.jpeg`,
            rating: rating||getRandomInt(1, 5)
        }
    )
    _saveBooks()
}

function getStats(books) {
    return books.reduce((acc, book) => {
        acc.total = books.length
        if (book.price >= 200) acc.expensive++
        if (book.price > 80 && book.price < 200) acc.avg++
        if (book.price <= 80) acc.cheap++
        return acc
    }, { total: 0, cheap: 0, avg: 0, expensive: 0 })
}

//private functions///////////////////////////////////////////////////////

function _createBook(title, price, imgUrl, rating) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: `img/${imgUrl}.jpeg`,
        rating: rating
    }
}

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            _createBook('The adventures of Sherlock Holmes', 120, 'sh', getRandomInt(1, 5)),
            _createBook('World Atlas', 300, 'wa', getRandomInt(1, 5)),
            _createBook('Zorba the Greek', 120, 'ztg', getRandomInt(1, 5))
        ]
        _saveBooks()
    }
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}
