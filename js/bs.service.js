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

