'use strict'

function makeId(length = 6) {
	var id = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		id += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return id
}

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function pipe(...functions) {
	return function (initialValue) {
		return functions.reduce((result, f) => f(result), initialValue)
	}
}

function f (x) {
    return x + 2
}

function g (y) {
    return y * 2
}

function h(x) {
    return x * 5
}

const functionsComposition = pipe(f,g,h)
const result = functionsComposition(2);
console.log('result', result);

