# study-log

错误：自定义按键修饰符，不生效。- 用在绑定了案件修饰符的控件上按键

## todolist 

### 分析

### 收获

- 利用计算属性
  - get根据单选获取全选状态
  - set根据全选设置单选状态
- 单选按钮 - 我用：change事件+ :checked，学习-直接利用v-model
- 通过事件 evt.target.value 获取当前控件的值
- 通过自定义指令 focus
  - 页面启动聚焦 -  inserted
  - 页面改变后聚焦 - update 
- localstorage - 参数为字符串，需要转换
  - `JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')`
  - `localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))`
- 利用 `onhashchange`事件处理路由，`或者 director.js`

### 错误

- `filterStat `值设置为 `''`,后面又用 ` filters[this.filterStat]`, 

  - `Error in render: "TypeError: filters[this.filterStat] is not a function"`
  - 不影响使用，但是报错，需要初始化`filterStat `

  

