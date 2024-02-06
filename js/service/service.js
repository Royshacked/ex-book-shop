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
            imgUrl: `img/${imgUrl}.jpeg`
        }
    )
    _saveBooks()
}

function readBook(id) {
    const book = gBooks.find(book => book.id === id)
    return book
}

//private functions

function _createBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: `img/${imgUrl}.jpeg`,
    }
}

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            _createBook('The adventures of Sherlock Holmes', 120, 'sh'),
            _createBook('World Atlas', 300, 'wa'),
            _createBook('Zorba the Greek', 120, 'ztg')
        ]
        _saveBooks()
    }
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}

function _countExpensive(books) {
    return books.reduce((acc, book) => {
        if (book.price >= 200) acc++
        return acc
    }, 0)
}

function _countAvg(books) {
    return books.reduce((acc, book) => {
        if (book.price > 80 && book.price < 200) acc++
        return acc
    }, 0)
}

function _countCheap(books) {
    return books.reduce((acc, book) => {
        if (book.price <= 80) acc++
        return acc
    }, 0)
}