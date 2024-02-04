'use strict'

var gBooks
_createBooks()

function removeBook(id) {
    const idx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(idx, 1)
    _saveBooks()
}

function updateBook(id, price) {
    const book = gBooks.find(book => book.id === id)
    book.price = price
    _saveBooks()
}

function addBook(title, price) {
    if (!title || !price) return

    gBooks.unshift(
        {
            id: makeId(),
            title: title,
            price: price,
            imgUrl: 'lori-ipsi.jpg'
        }
    )
    _saveBooks()
}

function readBook(id) {
    const book = gBooks.find(book => book.id === id)
    return book
}

function _createBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title: title,
        price: price,
        imgUrl: imgUrl,
    }
}

function _createBooks() {
    gBooks = loadFromStorage('bookDB')
    if (!gBooks || gBooks.length === 0) {
        gBooks = [
            _createBook('The adventures of Sherlock Holmes', 120, 'img/bg4j78.jpeg'),
            _createBook('World Atlas', 300, 'img/bg4j79.jpeg'),
            _createBook('Zorba the Greek', 120, 'img/bg4j80.jpeg')
        ]
        _saveBooks()
    }
}

function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}