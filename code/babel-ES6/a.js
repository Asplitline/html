let a = 10
let b = 20
let c = 30

function show() {
    console.log('hello es6')
}

export default {
    a,
    b,
    show
}

export let s1 = '123'
export let s2 = '456'
export function say() { console.log("hello") }

import './b'