

/* import _ from 'lodash';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component()); */

// 动态导入
// 普通版
/* function getComponent() {
    // const element = document.createElement('div')
    return import('lodash')
        .then(({ default: _ }) => {
            const element = document.createElement('div');
            element.innerHTML = _.join(['hello', 'webpack'], ' ')
            return element
        })
        .catch(error => 'An error occurred while loading the component')
} */

// async简化
async function getComponent() {
    const element = document.createElement('div')
    const { default: _ } = await import('lodash')
    element.innerHTML = _.join(['hello', 'webpack'], ' ')
    return element
}

getComponent().then(component => {
    document.body.appendChild(component)
})