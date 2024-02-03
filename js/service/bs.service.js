'use strict'

const gBooks = [
    {
        id: 'bg4J78',
        title: 'The adventures of Lori Ipsi',
        price: 120,
        imgUrl: 'lori-ipsi.jpg'
    },
    {
        id: 'bg4J79',
        title: 'World Atlas',
        price: 300,
        imgUrl: 'lori-ipsi.jpg'
    },
    {
        id: 'bg4J80',
        title: 'Zorba the Greek',
        price: 120,
        imgUrl: 'lori-ipsi.jpg'
    }
]

function removeBook(id) {
    const idx = gBooks.findIndex(book => book.id === id)
    gBooks.splice(idx, 1)
}

function updateBook(id, price) {
    const book = gBooks.find(book => book.id === id)
    book.price = price
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
}

function readBook(id) {
    const book = gBooks.find(book => book.id === id)
    return book
}