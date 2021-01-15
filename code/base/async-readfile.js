
/**
 * async关键字
 * 1.普通函数加async关键字变成异步函数
 * 2.异步函数默认的返回值是promise对象
 * 3.在异步函数内部使用throw关键字进行错误的抛出
 */

/**
 * await关键字
 * 1.只能出现在异步函数
 * 2.await promise 暂停异步函数的执行 等待返回后再向下执行
 */

const fs = require('fs');

// 调用util模块promisify方法
const promisify = require('util').promisify;
// promisify方法使现有异步api返回promise对象
const readFile = promisify(fs.readFile);

async function run() {
    let r1 = await readFile('./src/async-a.txt', 'utf-8');
    let r2 = await readFile('./src/async-b.txt');
    let r3 = await readFile('./src/async-c.txt');
    console.log(r1);
    console.log(r2);
    console.log(r3);
}

run();