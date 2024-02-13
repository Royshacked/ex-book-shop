'use strict'

var gBooks
_createBooks()



function getBooks(options) {
    var books = _filterBooks(options.filterBy)
    
    _sortBooks(books,options.sortBy)
    
    if(options.page) {
        const booksIdx = options.page.idx * options.page.size
        books = books.slice(booksIdx, booksIdx + options.page.size)
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

function getBooksCount(filterBy) {
    return _filterBooks(filterBy).length
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

function _filterBooks(filterBy) {
    const title = filterBy.title.toLowerCase()
    const rating = filterBy.rating

    var books = gBooks.filter(book => 
        book.title.toLowerCase().includes(title) 
        && book.rating >= rating)

    return books
}

function _sortBooks(books,sortBy) {
    if(sortBy.title) {
        books.sort((book1,book2) => book1.title.localeCompare(book2.title) * sortBy.title)
    }
    else if(sortBy.price) {
        books.sort((book1,book2) => (book1.price - book2.price) * sortBy.price)
    }
    else if(sortBy.rating) {
        books.sort((book1,book2) => (book1.rating - book2.rating) * sortBy.rating)
    }
}

// function _pagingBooks(books,page) {
//     if(page) {
//         const booksIdx = page.idx * page.size
//         books = books.slice(booksIdx, booksIdx + page.size)} 

// }


function _saveBooks() {
    saveToStorage('bookDB', gBooks)
}
