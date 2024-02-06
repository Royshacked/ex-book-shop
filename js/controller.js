'use strict'

var gFilterBy = ''
var gcloseModal

function onInit() {
    render()
    renderStats()
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
                <button class="update" onclick = "onUpdateBook('${book.id}','${book.title}')">Update</button>
                <button class="delete" onclick = "onRemoveBook('${book.id}','${book.title}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('')

    document.querySelector('table').innerHTML = strHTML
}

function onRemoveBook(bookId, bookTitle) {
    removeBook(bookId)
    render()
    renderStats()
    onEventMsg(bookTitle, 'removed')
}

function onUpdateBook(bookId, bookTitle) {
    const newPrice = +prompt('Please insert new price')
    const newImage = prompt('Please insert imgUrl')

    if (!newPrice && !newImage) return
    updateBook(bookId, newPrice, newImage)
    render()
    renderStats()
    onEventMsg(bookTitle, 'updated')
}

function onAddBook() {
    const title = prompt('Please insert Book title')
    const price = +prompt('Please insert Book price')
    const image = prompt('please insert imgUrl')
    if (!title || !price) return
    addBook(title, price, image)
    render()
    renderStats()
    onEventMsg(title, 'added')
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

function onEventMsg(bookTitle, event) {
    const elEventMsg = document.querySelector('.event-msg')
    const elTitle = document.querySelector('.event-msg h2')

    elTitle.innerText = `The book "${bookTitle}" has been ${event} succesfully!`

    elEventMsg.showModal()

    gcloseModal = setTimeout(() => {
        elEventMsg.close()
    }, 2000);
}

function renderStats() {
    const books = getBooks(0)
    const elTotal = document.querySelector('.total')
    const elExpensive = document.querySelector('.expensive')
    const elAvg = document.querySelector('.avg')
    const elCheap = document.querySelector('.cheap')

    const totalCount = books.length

    elTotal.innerText = `Total: ${totalCount}`
    elExpensive.innerText = `Expensive: ${_countExpensive(books)}`
    elAvg.innerText = `Avg: ${_countAvg(books)}`
    elCheap.innerText = `Cheap: ${_countCheap(books)}`
}

