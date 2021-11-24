# 习惯

- 每个文件写个readme 主要记录在编程中遇到的问题
  - 分析
  - 收获 
  - 问题  

# css

- 使用浮动，一定要处理好，不能出现高度为0的元素，就算那个元素不影响布局
- 浮动不要深了，就直接写在父元素上
- 给ul一个类名

# eslint

```json
// .prettierrc
// 逗号,单引号 
{
  "semi": false,
  "singleQuote": true
}

// .eslintrc.js
// function 前后空格
rules: {
	...
  'space-before-function-paren': 0
},
```

## git

流程

- 分支提交本地
- 分支合并主分支
- 提交主分支
- 提交分支

```shell
# 记住 exam - master
git push -u exam master 
```



