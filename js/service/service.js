'use strict'

var gBooks
_createBooks()

function getBooks(filterBy) {
    if (!filterBy) return gBooks

    var str = filterBy.toLowerCase()
    const filteredBooks = gBooks.filter(book => book.title.toLowerCase().includes(str))
    return filteredBooks
}

function removeBook(id) {
    const idx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(idx, 1)
    _saveBooks()
}

function updateBook(id, price, imgUrl) {
    const book = gBooks.find(book => book.id === id)
    book.price = price
    book.imgUrl = `img/${imgUrl}.jpeg`
    _saveBooks()
}

function addBook(title, price, imgUrl) {
    gBooks.unshift(
        {
            id: makeId(),
            title: title,
            price: price,
            imgUrl: `img/${imgUrl}.jpeg`,
            rating: getRandomInt(1, 5)
        }
    )
    _saveBooks()
}

function readBook(id) {
    const book = gBooks.find(book => book.id === id)
    return book
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

// function countExpensive(books) {
//     return books.reduce((acc, book) => {
//         if (book.price >= 200) acc++
//         return acc
//     }, 0)
// }

// function countAvg(books) {
//     return books.reduce((acc, book) => {
//         if (book.price > 80 && book.price < 200) acc++
//         return acc
//     }, 0)
// }

// function countCheap(books) {
//     return books.reduce((acc, book) => {
//         if (book.price <= 80) acc++
//         return acc
//     }, 0)
// }
