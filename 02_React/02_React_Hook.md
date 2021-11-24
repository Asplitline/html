# Hook

**Hook 使你在无需修改组件结构的情况下复用状态逻辑。**

> **完全可选，向后兼容**
>
> hook 在 class内部不起作用

## State hook

允许在函数组件中，添加 state的hook，用于数据初始化和设置，

### 声明state

#### class

this.state

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

#### hook

##### useState 

state 只在首次渲染时创建初始化，下一次直接使用

- 参数 （唯一）：初始值。在第一次渲染调用
- 返回值：返回一对值`[state,setState]`，当前 state 以及更新 state 的函数

React 使用 [`Object.is` 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 来比较 state，相等会React 将跳过子组件的渲染及 effect 的执行。

**默认初始化**

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量
  const [count, setCount] = useState(0);
}
```

**惰性初始化**

初始 state 需要通过复杂计算获得，则可以传入一个函数

```jsx
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

### 读取state

#### class

this.state

```jsx
  <p>You clicked {this.state.count} times</p>
```

#### hook

state

```jsx
  <p>You clicked {count} times</p>
```

### 更新state

#### class

**会自动合并更新对象**

```jsx
 <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
 </button>
```

#### hook

**不会自动合并更新对象**

直接赋值

```jsx
<button onClick={() => setCount(count + 1)}> Click me </button>
```

函数式更新

```jsx
<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
```

## Effect Hook

在函数组件中执行副作用操作

**副作用**：函数组件主体内（指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作

### useEffect

- 每次渲染后调用（包括第一次）`DidMount + DidUpdate`
- 返回值：返回一个清除函数，用来清除副作用 `unMount`
- 组件内声明，可以访问到  state 和 props

### effect 操作

#### 不清楚effect

**在 React 更新 DOM 之后运行一些额外的代码**

- 网络请求
- 手动变更DOM
- 记类日志

上述操作完成后，可以忽略，无需清除。

**class**：副作用放在 `componentDidMount` 和 `componentDidUpdat`

实现初始化和更新，两个生命周期都需编写重复代码。

```jsx
class Example extends React.Component {
  ...

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  ...
}
```

**hook**：react 会保存 effect 中函数，在 dom更新后调用。

- `useEffect`在组件间内部访问，可以直接访问 state，props。

- **`useEffect` 会在每次渲染后都执行**，每次渲染都会生产新的 effect。

> 与 `componentDidMount` 或 `componentDidUpdate` 不同，使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕

```jsx
import React, { useState, useEffect } from 'react';
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {   
      document.title = `You clicked ${count} times`;  });
  }
  ...
}
```

#### 清除effect

清除effect，防止内存泄露

- 订阅外部数据

**class**：`componentDidMount` 中设置订阅，并在 `componentWillUnmount` 中清除它

```jsx
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Loading...';
    }
    return this.state.isOnline ? 'Online' : 'Offline';
  }
}
```

**hook**

effect 返回一个清除函数

- 时机：组件卸载时执行清除操作
- 多次渲染，在下一个effect执行前，上一个effect将被清除

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### effect 提示

#### 关注点分离

 Hook[目的](https://zh-hans.reactjs.org/docs/hooks-intro.html#complex-components-become-hard-to-understand)之一：解决 class 中生命周期经常包含不相关逻辑，而相关逻辑也被分到不同方法。

**class**：单点功能被分割在 三个钩子函数和普通函数，并且不同功能又在同一钩子函数中

```jsx
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

**hook**：单点功能统一在 effect中处理

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

#### 每次都运行effect

通常在 `Mount`中订阅，在 `UnMount`中卸载。但`props`发生变化，会导致无法清除旧的订阅

```jsx
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

**class**：通过 `Update` ，清除旧的订阅新的。可能会忘记处理 `Update`，造成Bug 

```jsx

  componentDidUpdate(prevProps) {
    // 取消订阅之前的 friend.id
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // 订阅新的 friend.id
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

**Hook**：会在调用一个新的 effect 之前对前一个 effect 进行清理。

```jsx
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // 清除订阅
    subscription.unsubscribe();
  };
});
```

#### 跳过effect

**class**：在 `componentDidUpdate` 中添加对 `prevProps` 或 `prevState` 的比较逻辑解决，避免**重复渲染**

```jsx
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

**hook**：传递第二个可选参数，跳过effect 调用

- 全等比较，参数值相等，不调用effect
- `[]`表示，不依赖 props和state，只在渲染时**执行一次**。

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

> 确保数组中包含了**所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量

- 

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

### effect 执行时机

与 `componentDidMount`、`componentDidUpdate` 不同的是，传给 `useEffect` 的函数会**在浏览器完成布局与绘制之后**，在一个延迟事件中被调用，会保证在任何新的渲染前执行。

在开始新的更新前，React 总会先清除上一轮渲染的 effect。

一个对用户可见的 DOM 变更就必须在浏览器执行下一次绘制前被同步执行，这是useEffect无法办到的。React 为此提供了一个额外的 [`useLayoutEffect`](https://zh-hans.reactjs.org/docs/hooks-reference.html#uselayouteffect) Hook 

### effect 条件执行

默认情况下，effect 会在每轮组件渲染完成后执行，一旦 effect 的依赖发生变化，它就会被重新创建。

如果不需要每次渲染都创建，传递第二个参数

```jsx
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

## Hook 规则

Hook 就是 JavaScript 函数，遵循以下两条规则

- **不要在循环，条件或嵌套函数中调用 Hook，** 在 React 函数的最顶层以及任何 return 之前调用他们。 -  这样能保证顺序调用，Hook 的调用顺序在每次渲染中都是相同

- **不要在普通的 JavaScript 函数中调用 Hook。**- 让代码状态逻辑清晰

  - [x] React 函数组件

  - [x] 自定义Hook

[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) 的 ESLint 插件来强制执行这两条规则

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```json
// 你的 ESLint 配置
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 effect 的依赖
  }
}
```



## 自定义hook

组件之间**重用**一些状态逻辑。

三种解决方案：：[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)和 [render props](https://zh-hans.reactjs.org/docs/render-props.html)，自定义hook

函数的名字以 “`use`” 开头并调用其他 Hook，我们就说这是一个自定义 Hook

- 以 `use`开头，React会自动进行规则检测
- 自定义`hook`间，state 独立

```jsx
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

组件间的 state 是完全独立的。

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

编写 userReducer

```jsx
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```

```jsx
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

```jsx
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```



## 其他hook

### UseContext

[`useContext`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) ：不使用组件嵌套就可以订阅 React 的 Context

- 接收一个对象（React）

```jsx
const value = useContext(MyContext);
```

 [`useReducer`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) ：通过 reducer 来管理组件本地的复杂 state。

```jsx
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);  // ...
```

# https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect
