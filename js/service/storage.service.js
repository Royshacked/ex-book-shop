'use strict'

// value gets gbooks (value) as argument and turn it into str (JSON.stringify) 
// and set in storage name 'bookDB' (key) 

function saveToStorage(key, value) { 
    const valStr = JSON.stringify(value)
    localStorage.setItem(key, valStr)
}

// load storage from bookDB (key)  and return it after turn it from str to array /(JSON.parse)
 
function loadFromStorage(key) { 
    const valStr = localStorage.getItem(key)
    return JSON.parse(valStr)
}