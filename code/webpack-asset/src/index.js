// 1. 通过html中外部引入
// 2. 通过import 导入
import _ from 'lodash'

// 引入css
import './style.css'
// 引入图片
import Icon from './pic.jpg'
// 引入数据 (JSON,CSV,TSV,XML)
import Data from './data.xml'
import Notes from './data.csv'
import json from '../package.json'


function component() {
    const element = document.createElement('div');
    // lodash
    element.innerHTML = _.join(['hello', 'webpack'], ' ');

    // css
    element.classList.add('hello'); //添加hello类

    // 图片
    // 1.img
    // 2.css background
    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    // 数据
    console.log(Data);
    console.log(Notes);
    console.log(json);

    return element;
}

document.body.appendChild(component());

// npx webpack 构建项目