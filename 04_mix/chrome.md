## 快速查看页面结构

```js
$$('*').forEach(i=>{
    i.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
```

