'use strict'

const gQueryOptions = {
    filterBy: { title: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 4 }
}

var gcloseModal
var gBookId = ''

function onInit() {
    render()
    renderStats()
}

function render() {
    const books = getBooks(gQueryOptions)

    var strHTML = `<tr><th>Title</th> <th>Price</th> <th>Ratings</th> <th>Actions</th></tr>` + books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>${book.rating}</td>
            <td>
                <div class = "actions">
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
    onUserMsg('removed')
}

function onUpdateBook(bookId) {
    document.querySelector('.edit-book h2').innerText = 'Update book'
    document.querySelector('.add-title').classList.add('hidden')
    document.querySelector(".edit-book").showModal()
    gBookId = bookId
}

function onAddBook() {
    document.querySelector('.edit-book h2').innerText = 'Add book'
    document.querySelector('.add-title').classList.remove('hidden')
    document.querySelector(".edit-book").showModal()
    gBookId = ''
}

function onSaveBook() {
    const title = document.querySelector('.add-title').value
    const price = document.querySelector('.add-price').value
    const rating = document.querySelector('.add-rating').value
    const imgUrl = document.querySelector('.add-imgurl').value

    if(!gBookId) addBook(title, price, rating, imgUrl)
    if(gBookId) updateBook(gBookId, price, rating, imgUrl)
    onResetEditBook()
    render()
    renderStats()
    onUserMsg('updated')
}

function onResetEditBook() {
    document.querySelector('.edit-book form').reset()
}

function onCloseAddBook() {
    document.querySelector(".edit-book").close()
    onResetEditBook()
}

function onReadBook(bookId) {
    const elModal = document.querySelector('.book-details')
    const elTxt = elModal.querySelector('h2 span')
    const elImg = elModal.querySelector('.book-cover img')
    const elPrice = document.querySelector('.price')
    const elRate = document.querySelector('.rating')

    const book = readBook(bookId)

    elTxt.innerText = book.title
    elImg.src = book.imgUrl
    elPrice.innerText = book.price
    elRate.innerText = book.rating

    elModal.showModal()
}

function onSetFilterBy() {
    const elTitle = document.querySelector('.filter-title').value
    const elRating = document.querySelector('.filter-rating').value

    gQueryOptions.filterBy.title = elTitle
    gQueryOptions.filterBy.rating = elRating

    renderStats()
    render()
}

function onClearFilter() {
    document.querySelector('.filter-title').value = ''
    document.querySelector('.filter-rating').value = 1

    gQueryOptions.filterBy.title = ''
    gQueryOptions.filterBy.rating = 1

    renderStats()
    render()
}

function onUserMsg(event) {
    const elEventMsg = document.querySelector('.user-msg')
    const elTitle = elEventMsg.querySelector('p')

    elTitle.innerText = `The book has been ${event} succesfully!`

    elEventMsg.showModal()

    gcloseModal = setTimeout(() => {
        elEventMsg.close()
    }, 2000);
}

function renderStats() {
    const books = getBooks(gQueryOptions)
    const stats = getStats(books)
    const elTotal = document.querySelector('.total')
    const elExpensive = document.querySelector('.expensive')
    const elAvg = document.querySelector('.avg')
    const elCheap = document.querySelector('.cheap')

    elTotal.innerText = `Total: ${stats.total}`
    elExpensive.innerText = `Expensive: ${stats.expensive}`
    elAvg.innerText = `Avg: ${stats.avg}`
    elCheap.innerText = `Cheap: ${stats.cheap}`
}

