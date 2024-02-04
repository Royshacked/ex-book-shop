'use strict'

function onInit() {
    render()
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
    const elImg = elModal.querySelector('.book-cover') 

    const book = readBook(bookId)
    const bookStr = `<img src="${book.imgUrl}" loading="eager">` //load img with opening of dialog

    elTxt.innerText = book.title
    elImg.innerHTML = bookStr

    elModal.showModal()
}