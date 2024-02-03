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
                <button class="read">Read</button>
                <button class="update">Update</button>
                <button class="delete">Delete</button>
            </td>
        </tr>
    `).join('')

    const elTable = document.querySelector('table')
    elTable.innerHTML = strHTML
}