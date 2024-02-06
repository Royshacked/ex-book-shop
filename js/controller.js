'use strict'

var gFilterBy = ''

function onInit() {
    render()
}

function render() {
    const books = getBooks(gFilterBy)
    var strHTML = `<tr><th>Title</th><th>Price</th><th>Actions</th></tr>` + books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <div>
                <button class="read" onclick = "onReadBook('${book.id}')">Read</button>
                <button class="update" onclick = "onUpdateBook('${book.id}')">Update</button>
                <button class="delete" onclick = "onRemoveBook('${book.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('')

    document.querySelector('table').innerHTML = strHTML
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    render()
}

function onUpdateBook(bookId) {
    const newPrice = +prompt('Please insert new price')
    const newImage = prompt('Please insert imgUrl')
    updateBook(bookId,newPrice,newImage)
    render()
}

function onAddBook() {
    const title = prompt('Please insert Book title')
    const price = +prompt('Please insert Book price')
    const image = prompt('please insert imgUrl')
    addBook(title,price,image) 
    render()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTxt = elModal.querySelector('h2 span')
    const elImg = elModal.querySelector('.book-cover img') 

    const book = readBook(bookId)

    elTxt.innerText = book.title
    elImg.src = book.imgUrl

    elModal.showModal()
}

function onSetFilterBy(elFilterBy) {
    gFilterBy = elFilterBy.value
    render()
}

function onClearFilter() {
    const elFilterBy = document.querySelector('.filter input')
    elFilterBy.value = ''
    gFilterBy = ''
    render()
}