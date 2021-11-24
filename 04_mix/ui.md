# antd

## antd 按需导入

### babel-import

```shell
yarn add antd -D
yarn add babel-plugin-import -D
yarn add less less-loader -D

# yarn add eject -D
```

`.babelrc`

https://github.com/ant-design/babel-plugin-import

```json
{
  "presets": ["react-app"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }
    ]
  ]
}
```

### 手动引入

```js
import DatePicker from 'antd/es/date-picker'; // 加载 JS
import 'antd/es/date-picker/style/css'; // 加载 CSS
// import 'antd/es/date-picker/style';         // 加载 LESS
```

