'use strict'

const gQueryOptions = {
    filterBy: { title: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

var gcloseModal
var gBookId = ''

function onInit() {
    renderBooks()
    renderStats()
}

function renderBooks() {
    const books = getBooks(gQueryOptions)

    if (!books.length) return renderEmptyTable()

    const strHTML = `<tr><th>Title</th> <th>Price</th> <th>Ratings</th> <th>Actions</th></tr>` + books.map(book => `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td> ${'*'.repeat(book.rating)}</td>
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

function renderEmptyTable() {
    const strHTML = `<tr><th>Title</th> <th>Price</th> <th>Ratings</th> <th>Actions</th></tr>
                    <tr>
                    <td class = "no-matches" colspan = "4" rowspan = "5" >No matching books were found...</td>
                    </tr> 
                    `
    document.querySelector('table').innerHTML = strHTML

    setTimeout(() => {
        onClearFilter()
    }, 2000);
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
    renderStats()
    onUserMsg('removed')
}

function onUpdateBook(bookId) {
    const title = document.querySelector('.edit-title')
    const price = document.querySelector('.edit-price')

    document.querySelector('.edit-book h2').innerText = 'Update book'

    title.classList.add('hidden')
    title.removeAttribute('required')
    price.removeAttribute('required')

    document.querySelector(".edit-book").showModal()
    gBookId = bookId
}

function onAddBook() {
    const title = document.querySelector('.edit-title')
    const price = document.querySelector('.edit-price')

    document.querySelector('.edit-book h2').innerText = 'Add book'

    title.classList.remove('hidden')
    title.setAttribute('required', '')
    price.setAttribute('required', '')

    document.querySelector(".edit-book").showModal()
    gBookId = ''
}

function onChangeRating(operator) {
    var rating = +document.querySelector('.rating-value').innerText
    rating = rating + operator
    if(rating>5) rating = 5
    if(rating<1) rating = 1
    document.querySelector('.rating-value').innerText = rating
}

function onSaveBook() {
    var userMsg
    const title = document.querySelector('.edit-title').value
    const price = document.querySelector('.edit-price').value
    const rating = +document.querySelector('.rating-value').innerText
    const imgUrl = document.querySelector('.edit-imgurl').value

    if (!gBookId) {
        addBook(title, price, rating, imgUrl)
        userMsg = 'added'
    }
    if (gBookId) {
        updateBook(gBookId, price, rating, imgUrl)
        userMsg = 'updated'
    }
    renderBooks()
    renderStats()
    onResetEditBook()
    onUserMsg(userMsg)
}

function onResetEditBook() {
    document.querySelector('.edit-book form').reset()
    document.querySelector('.rating-value').innerText = 1
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
    elRate.innerText = '*'.repeat(book.rating)

    elModal.showModal()
}

function onSetFilterBy() {
    const elTitle = document.querySelector('.filter-title').value
    const elRating = document.querySelector('.filter-rating').value

    gQueryOptions.filterBy.title = elTitle
    gQueryOptions.filterBy.rating = elRating

    renderStats()
    renderBooks()
}

function onSetSortBy() {
    const sort = document.querySelector('.sort select').value
    const elDir = document.querySelector('.sort-desc')

    const dir = elDir.checked ? -1 : 1
    gQueryOptions.sortBy = { [sort]: dir }

    renderBooks()
}

function onClearFilter() {
    document.querySelector('.filter-title').value = ''
    document.querySelector('.filter-rating').value = 1

    gQueryOptions.filterBy.title = ''
    gQueryOptions.filterBy.rating = 1

    renderStats()
    renderBooks()
}

function onNextPage() {
    const booksCount = getBooksCount(gQueryOptions.filterBy)

    if (booksCount > (gQueryOptions.page.idx + 1) * gQueryOptions.page.size) {
        gQueryOptions.page.idx++
    } else {
        gQueryOptions.page.idx = 0
    }

    renderBooks()
}

function onPrevPage() {
    const booksCount = getBooksCount(gQueryOptions.filterBy)
    const lastPage = Math.ceil(booksCount/gQueryOptions.page.size) - 1


    if (gQueryOptions.page.idx - 1 < 0) {
        gQueryOptions.page.idx = lastPage
    }
    else {
        gQueryOptions.page.idx--
    }

    renderBooks()
}

function onUserMsg(event) {
    const elEventMsg = document.querySelector('.user-msg')
    const elTitle = elEventMsg.querySelector('p')

    elTitle.innerText = `The book has been ${event} succesfully!`

    elEventMsg.classList.remove('hidden')

    gcloseModal = setTimeout(() => {
        elEventMsg.classList.add('hidden')
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


