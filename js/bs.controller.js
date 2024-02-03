'use strict'

function onInit() {
    render()
}

function getModel() {
    return gBooks
}

function render() {
    const books = getModel()
    var strHTML = `<tr><th>Title</th><th>Price</th><th>Actions</th></tr>` + books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="read" onclick = "onReadBook('${book.id}')">Read</button>
                <button class="update" onclick = "onUpdateBook('${book.id}')">Update</button>
                <button class="delete" onclick = "onRemoveBook('${book.id}')">Delete</button>
            </td>
        </tr>
    `).join('')

    const elTable = document.querySelector('table')
    elTable.innerHTML = strHTML
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId) {
    const newPrice = +prompt('Please insert new price')
    updateBook(bookId,newPrice)
    render()
}

function onAddBook() {
    const title = prompt('Please insert Book title')
    const price = +prompt('Please insert Book price')
    addBook(title,price) 
    render()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTxt = elModal.querySelector('h2 span')
    const elPre = elModal.querySelector('pre') 

    const book = readBook(bookId)
    const bookStr = JSON.stringify(book, null, 4)

    elTxt.innerText = book.title
    elPre.innerText = bookStr

    elModal.showModal()
}