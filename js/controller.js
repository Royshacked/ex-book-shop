'use strict'

const gQueryOptions = {
    filterBy: { title: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

var gcloseModal
var gBookId = ''

function onInit() {
    readQueryParams()
    renderBooks()
    renderPageCount()
    renderStats() 
}

function renderBooks() {
    const books = getBooks(gQueryOptions)

    if (!books.length) {
        renderEmptyTable()
        return
    }

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

function renderPageCount() {
    const currPage = gQueryOptions.page.idx + 1
    const numOfPages = getNumberOfPages(gQueryOptions.filterBy,gQueryOptions.page.size) 

    document.querySelector('.page-number span').innerText = `${currPage} of ${numOfPages}`
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
    renderPageCount()
    renderStats()
    onUserMsg('removed')
}

function onUpdateBook(bookId) {
    const book = getBookById(bookId)
    const title = document.querySelector('.edit-title')
    const price = document.querySelector('.edit-price')

    document.querySelector('.edit-book h2').innerText = 'Update book'

    title.value = book.title
    title.removeAttribute('required')
    price.removeAttribute('required')

    document.querySelector(".edit-book").showModal()
    gBookId = bookId
}

function onAddBook() {
    const title = document.querySelector('.edit-title')
    const price = document.querySelector('.edit-price')

    document.querySelector('.edit-book h2').innerText = 'Add book'

    title.setAttribute('required', '')
    price.setAttribute('required', '')

    document.querySelector(".edit-book").showModal()
    gBookId = ''
}

function onChangeRating(operator) {
    var rating = +document.querySelector('.rating-value').innerText

    rating = rating + operator
    if (rating > 5) rating = 5
    if (rating < 1) rating = 1

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
        updateBook(gBookId, title, price, rating, imgUrl)
        userMsg = 'updated'
    }
    renderBooks()
    renderPageCount()
    renderStats()
    onResetEditBook()
    onUserMsg(userMsg)
}

function onResetEditBook() {
    document.querySelector('.edit-book form').reset()
    document.querySelector('.rating-value').innerText = 0
}

function onCloseEditBook() {
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

    restePage()
    setQueryParams()
    renderBooks()
    renderPageCount()
    renderStats()
}

function onSetSortBy() {
    const sort = document.querySelector('.sort select').value
    const elDesc = document.querySelector('.sort-desc')
    const elAsc = document.querySelector('.sort-asc')

    const dir = elDesc.checked ? -1 : 1
    gQueryOptions.sortBy = { [sort]: dir }

    restePage()
    setQueryParams()
    renderBooks()
    renderPageCount()
}

function onClearFilter() {
    document.querySelector('.filter-title').value = ''
    document.querySelector('.filter-rating').value = 1

    gQueryOptions.filterBy.title = ''
    gQueryOptions.filterBy.rating = 0

    setQueryParams()
    renderBooks()
    renderPageCount()
    renderStats()
}

function onChangePage(diff) {
    const maxPageIdx = getNumberOfPages(gQueryOptions.filterBy,gQueryOptions.page.size) - 1
    var nextPageIdx = gQueryOptions.page.idx += diff

    if(nextPageIdx > maxPageIdx) gQueryOptions.page.idx = 0
    if(nextPageIdx < 0) gQueryOptions.page.idx = maxPageIdx

    nextPageIdx = gQueryOptions.page.idx

    setQueryParams()
    renderPageCount()
    renderBooks()
}

function restePage() {
    return gQueryOptions.page.idx = 0
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
    const stats = getStats()
    const elTotal = document.querySelector('.total')
    const elExpensive = document.querySelector('.expensive')
    const elAvg = document.querySelector('.avg')
    const elCheap = document.querySelector('.cheap')

    elTotal.innerText = `Total: ${stats.total}`
    elExpensive.innerText = `Expensive: ${stats.expensive}`
    elAvg.innerText = `Avg: ${stats.avg}`
    elCheap.innerText = `Cheap: ${stats.cheap}`
}

//****************************************************************************************************************** */

function setQueryParams() {
    const queryParams = new URLSearchParams()

    //filter
    queryParams.set('title', gQueryOptions.filterBy.title)
    queryParams.set('rating', gQueryOptions.filterBy.rating)

    //sort
    const sortKeys = Object.keys(gQueryOptions.sortBy)
    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    //page
    queryParams.set('pageIdx', gQueryOptions.page.idx)
    queryParams.set('pageSize', gQueryOptions.page.size)

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    //filter
    gQueryOptions.filterBy = {
        title: queryParams.get('title') || '',
        rating: +queryParams.get('rating') || 0,
    }

    //sort
    if (queryParams.get('sortBy')) {
        const prop = queryParams.get('sortBy')
        const dir = queryParams.get('sortDir')
        gQueryOptions.sortBy[prop] = dir
    }

    //page
    if (queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
        gQueryOptions.page.size = +queryParams.get('pageSize')
    }
    renderQueryParams()
}

function renderQueryParams() {
    //filter
    document.querySelector('.filter-title').value = gQueryOptions.filterBy.title
    document.querySelector('.filter-rating').value = gQueryOptions.filterBy.rating

    //sort
    const sortKeys = Object.keys(gQueryOptions.sortBy)
    const sortBy = sortKeys[0]
    const dir = gQueryOptions[sortBy]

    const sortType = (dir === -1) ? 'sort-desc' : 'sort-asc'
    document.querySelector('.sort select').value = sortBy || ''
    document.querySelector(`.${sortType}`).checked = true
}


