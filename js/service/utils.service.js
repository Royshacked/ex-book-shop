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


// function f (x) {
//     return x + 2
// }

// function g (y) {
//     return y * 2
// }

// function h(x) {
//     return x * 5
// }

// const result = f(g(3))

// function pipe(functions) {
//     const first = functions[0]()
//     const [el,rest] = functions
//     return rest.reduce((result, f) => f(result), first)
// }

// const newResult = pipe([f,g])
