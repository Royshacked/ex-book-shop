'use strict'

function saveToStorage(key, value) { // value gets gbooks (value) as argument and turn it into str (JSON.stringify) and set in storage name 'bookDB' (key) 
    const valStr = JSON.stringify(value)
    localStorage.setItem(key, valStr)
}

function loadFromStorage(key) { // load storage from bookDB (key)  and return it after turn it from str to array /(JSON.parse) 
    const valStr = localStorage.getItem(key)
    return JSON.parse(valStr)
}