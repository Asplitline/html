# Hook

**Hook 使你在无需修改组件结构的情况下复用状态逻辑。**

> **完全可选，向后兼容**
> 
> hook 在 class内部不起作用

==**启用 Hook，所有 React 相关的 package 都必须升级到 16.8.0 或更高版本**。==

==[React Native 0.59](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059) 及以上版本支持 Hook==

## State hook

允许在函数组件中，添加 state的hook，用于数据初始化和设置，

### useState

state 只在首次渲染时创建初始化，下一次直接使用

- 参数 （唯一）：初始值。在第一次渲染调用
- 返回值：返回一对值`[state,setState]`，当前 state 以及更新 state 的函数

> **不会自动合并更新对象**

### 声明state

#### class

this.state

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
```

#### hook

**默认初始化**

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量
  const [count, setCount] = useState(0);
}
```

**惰性初始化**

初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数**只会在初始渲染时被调用**

```jsx
const initCounter = () => {
    console.log('initCounter');
    return { number: props.number };
  };
const [counter, setCounter] = useState(initCounter);
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

直接赋值

```jsx
<button onClick={() => setCount(count + 1)}> Click me </button>
```

函数式更新

往 `setState` 传递函数，该函数将接收先前的 state，并返回一个更新后的值

```jsx
<button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
```

React 使用 [`Object.is` 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 来比较 state，相等会React 将跳**过子组件的渲染及 effect 的执行**。

## Effect Hook

在函数组件主体内（React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含**副作用操作**都是不被允许的，这可能会**产生bug 并破坏 UI 的一致性**

> 副作用操作：[纯函数和副作用函数](#纯函数和副作用函数)

### useEffect 

用于完成副作用操作

- 参数：包含副作用代码的函数
- 返回值：返回一个清除函数，用来清除副作用
- 组件内声明：可以访问到  state 和 props
- 执行时机：在浏览器完成布局和绘制之后，下一次重新渲染之前执行

与生命周期的对比

- 初次渲染后或者更新完成更新完成后 =>`DidMount + DidUpdate`
- 清除函数 => `unMount`

### effect 依赖项

#### 正确设置依赖项

1. 依赖项数组中包含所有在 `effect` 中用到的值
2. 修改 `effect` 中的代码来减少依赖项

回调函数模式，可以不绑定依赖项

```jsx
const [count,setCount] = useState(0)

useEffect(()=>{
   const timer = setInterval(()=>{
   	setcount((count) =>count + 1)
   },1000)
   return ()=> clearInterval(timer)
},[])

```



### effect 操作

#### 不清除副作用

**在 React 更新 DOM 之后运行一些额外的代码**

- 网络请求
- 手动变更DOM
- 记类日志

上述操作完成后，可以忽略，无需清除。

**class**：副作用放在 `componentDidMount` 和 `componentDidUpdate`

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

- `useEffect` 在组件间内部访问，可以直接访问 state，props。
- `useEffect` **在每次渲染后都执行**，每次渲染都会生产新的 effect。

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

不同点

1. 使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，因为大多数 `useEffect` 函数不需要同步执行

> `componentDidMount` 或 `componentDidUpdate` 会阻塞浏览器更新屏幕

2. useEffect 每次渲染可以看作独立函数，接收props和state

>  `componentDidMount` 中的 `this.state` 始终指向最新数据

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

```jsx
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
```

#### 清除副作用

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

effect 返回一个清除函数。

1. 组件卸载时执行清除操作
2. **每次重新渲染**时清除

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
- 依赖项是引用类型时，React 会比较两次内存地址。如果一致，effect 不会执行，只有当对比结果不一致时，effect 才会执行。

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```

确保数组中包含了**所有外部作用域中会随时间变化并且在 effect 中使用的变量**，否则你的代码会引用到先前渲染中的旧变量

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

与 `componentDidMount`、`componentDidUpdate` 不同的是，传给 `useEffect` 的函数会**在浏览器完成布局与绘制之后**，在一个延迟事件中被调用，会保证在任何**新的渲染前**执行。

在开始新的更新前，React 总会先清除上一轮渲染的 effect。

useEffect缺陷：一个对用户可见的 DOM 变更就必须在浏览器执行下一次绘制前被同步执行。

React 为此提供了一个额外的 [`useLayoutEffect`](#useLayoutEffect) Hook 

### effect 条件执行

默认情况下，effect 会在每轮组件渲染完成后执行，一旦 effect 的**依赖发生变化**，它就会被**重新创建**。

如果**不需要每次渲染都创建**，传递第二个参数

参数保证以下两个原则，否则你的代码会引用到先前渲染中的旧变量。

- 外部会变化
- effect内部在使用

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

> **在组件中 React 是通过判断 Hook 调用的顺序来判断某个 state 对应的 `useState`**，所以必须保证 Hook 的调用顺序在多次渲染之间保持一致，React 才能正确地将内部 state 和

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

### useContext

**useContext**：读取 `context` 的值以及订阅 `context` 的变化，需要在上层组件树使用`<MyContext.Provider>` 来为下层组件*提供* `context`

- 接收一个`context`对象（`React.createContext`的返回值）
- 返回`context` 当前值
- 值由最近上层组件 `MyContext.Provider` 决定

上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会**触发重渲染**，并使用最新传递给 `MyContext` provider 的 context `value` 值。

> 即使祖先使用 [`React.memo`](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo) 或 [`shouldComponentUpdate`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)，也会在组件本身使用 `useContext` 时重新渲染。

==useContext：参数必须为context对象本身==

==调用了 **useContext** 的组件总会在 context 值变化时重新渲染。==可以 [通过使用 memoization 来优化](https://github.com/facebook/react/issues/15156#issuecomment-474590693)。

#### 语法

```jsx
const value = useContext(MyContext);
```

#### 案例

```jsx
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

### useReducer

**useReducer** ：通过 reducer 来管理组件本地的复杂 state。

useState 替代方案，适合逻辑更复杂且包含多个子值，下一个state依赖前一个state等

使用 useReducer 会触发深更新的组件做性能优化，==你可以向子组件传递 **dispatch** 而不是回调函数 。==

#### 语法

```jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

#### 案例

```jsx
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### 初始化 state

##### 默认初始化 - 第二参数

```jsx
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

React 不使用 `state = initialState` 这一由 Redux 推广开来的参数约定。

原因：有时候初始值依赖于 props，因此需要在调用 Hook 时指定。

模拟 Redux 的行为，使用上述的参数约定，可以通过调用 `useReducer(reducer, undefined, reducer)` 

##### 惰性初始化 - 第三参数

将 `init` 函数作为 `useReducer` 的第三个参数传入，这样初始 state 将被设置为 `init(initialArg)`

```jsx
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  // init(initialCount)
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### 跳过dispath

Reducer Hook 的返回值（返回state）与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。通过`Object.is` 比较

React 可能仍需要在跳过渲染前再次渲染该组件，但不会对组件树的“深层”节点进行不必要的渲染。可以通过 **useMemo** 优化

### useCallback

内联回调函数及依赖项数组作为参数传入 `useCallback`，**回调函数仅在某个依赖项改变时才会更新**。

- ==返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 回调函数==

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

当你把**回调函数**传递给经过**优化**的**并使用引用相等性去避免非必要渲染**（例如 `shouldComponentUpdate`）的**子组件**时，它将非常有用。

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

### useMemo

把“创建”函数和依赖项数组作为参数传入 `useMemo`，在某个依赖项改变时才重新计算 memoized 值。

- ==返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization) 值==
- 传入 `useMemo` 函数渲染期间执行，不要执行 副作用操作
- 性能优化手段，而非语义上的保证

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

==useCallback 缓存钩子函数，useMemo 缓存返回值==

### useRef

`useRef` 返回一个可变的 ref 对象，`current` 属性为 传入的元素。返回的 ref 对象在组件的**整个生命周期内持续存在**

- **可变**：将 ref 对象以 `<div ref={myRef} />` 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 `.current` 属性设置为相应的 DOM 节点
- **区别**：`useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。
- ref 对象内容发生变化时，`useRef` 并*不会*通知你，在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用[回调 ref](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node) 来实现。

```js
const refContainer = useRef(initialValue);
```

```jsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### useImperativeHandle

`useImperativeHandle` ：在使用 `ref` 时**自定义暴露给父组件的实例值**。

```jsx
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` 应当与 [`forwardRef`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 一起使用

```jsx
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

渲染 `<FancyInput ref={inputRef} />` 的父组件可以调用 `inputRef.current.focus()`。

### useLayoutEffect

会在所有的 **DOM 变更之后==同步==**调用 effect，在**浏览器执行绘制之前**，`useLayoutEffect` 内部的更新计划将被同步刷新。

**问题**：服务端渲染， `useLayoutEffect` 和 `useEffect` 都**无法在 Javascript 代码加载完成之前执行**。

**解决**：要从服务端渲染 中排除依赖布局 effect 组件，使用 `showChild && <Child />` 进行条件渲染，并使用 `useEffect(() => { setShowChild(true); }, [])` 延迟展示组件。

### useDebugValue

`useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签

```jsx
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return isOnline;
}
```

格式化值的显示可能是一项开销很大的操作，可以通过第二个参数，仅在Hook被检查时显示

```jsx
useDebugValue(date, date => date.toDateString());
```

## Hooks FAQ

### Class => Hook - 生命周期

- `constructor`：函数组件不需要构造函数。通过调用 [`useState`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate) 来初始化 state。如果计算的代价比较昂贵，你可以传一个函数给 `useState`。
- `getDerivedStateFromProps`：改为 [在渲染时](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops) 安排一次更新。
- `shouldComponentUpdate`：详见 [下方](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate) `React.memo`.
- `render`：这是**函数组件体本身**
- `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`：[useEffect Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect) 可以表达所有这些(包括 [不那么](https://zh-hans.reactjs.org/docs/hooks-faq.html#can-i-skip-an-effect-on-updates) [常见](https://zh-hans.reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates) 的场景)的组合。
- `getSnapshotBeforeUpdate`，`componentDidCatch` 以及 `getDerivedStateFromError`：目前还没有这些方法的 Hook 等价写法，但很快会被添加。

### ？实例变量

[`useRef()`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) Hook 不仅可以用于 DOM refs。「ref」 对象是一个 `current` 属性可变且可以容纳任意值的通用容器

```jsx
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

设定一个循环定时器，不会需要这个 ref（仅用来清除循环定时器）

```jsx
  // ...
  function handleCancelClick() {
    clearInterval(intervalRef.current);  }
  // ...
```

### 单个还是多个 state 变量

总是在一次 `useState()` 调用中传入一个包含了所有 state 的对象，但是它并不像 `this.setState`会自动合并

```jsx
setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
```

**推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化**

- 更容易抽离相关逻辑

```jsx
const [position, setPosition] = useState({ left: 0, top: 0 });
const [size, setSize] = useState({ width: 100, height: 100 });
```

### 获取上一轮 props 或 state

通过 ref 实现

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>Now: {count}, before: {prevCount}</h1>;
}
```

### ？如何实现 `getDerivedStateFromProps

### ？测量 DOM 节点

### 省略依赖列表

**只有 当函数（以及它所调用的函数）不引用 props、state 以及由它们衍生而来的值时，你才能放心地把它们从依赖列表中省略。**

> 以下案列存在bug

```jsx
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // 使用了 productId prop
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 这样是无效的，因为 `fetchProduct` 使用了 `productId`
  // ...
}
```

推荐修复方案，把函数移到effect内部。

> 建议 **在 effect 内部去声明它所需要的函数**，更容易发现依赖项

```jsx
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 把这个函数移动到 effect 内部后，我们可以清楚地看到它用到的值。
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      setProduct(json);
    }
    fetchProduct();
  }, [productId]); // ✅ 有效，因为我们的 effect 只用到了 productId
  // ...
}
```

定义局部变量来处理无序响应。

```jsx
 useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);
    }

    fetchProduct();
    return () => { ignore = true };
  }, [productId]
```

如果出于某些原因你 **无法 把一个函数移动到 effect 内部**，其他办法

- **函数移动到组件之外**，函数就无法依赖 props和state
- 万不得已的情况下，你可以 **把函数加入 effect 的依赖但 把它的定义包裹 **进 [`useCallback`](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback) Hook。

```jsx
function ProductPage({ productId }) {
  // ✅ 用 useCallback 包裹以避免随渲染发生改变
  const fetchProduct = useCallback(() => {
    // ... Does something with productId ...
  }, [productId]); // ✅ useCallback 的所有依赖都被指定了

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ useEffect 的所有依赖都被指定了
  // ...
}
```

### [？](https://zh-hans.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)effect 依赖频繁变化

以下案例：count 不会变化

传入空的依赖数组 `[]`，只在组件挂载时运行一次。

在 `setInterval` 的回调中，`count` 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 `count` 的值被保存在该闭包当中，且初值为 `0`。每隔一秒，回调就会执行 `setCount(0 + 1)`，因此，`count` 永远不会超过 1。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 这个 effect 依赖于 `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` 没有被指定为依赖

  return <h1>{count}</h1>;
}
```

指定 `[count]` 作为依赖列表就能修复这个 Bug，但会导致每次改变发生时定时器都被重置。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不使用组件作用域中的任何变量

  return <h1>{count}</h1>;
}
```

==用 `useReducer` Hook 把 state 更新逻辑移到 effect 之外。[这篇文章](https://adamrackis.dev/state-and-use-reducer/)==？



# QA

## 纯函数和副作用函数

纯函数（ Pure Function ）：对于**相同的输入，永远会得到相同的输出**，而且没有任何可观察的副作用，这样的函数被称为纯函数。

副作用函数（ Side effect Function ）：如果一个函数在运行的过程中，除了返回函数值，还对**主调用函数产生附加的影响**，这样的函数被称为副作用函数。

useEffect 就是在 React 更新 DOM 之后运行一些额外的代码，也就是执行副作用操作，比如请求数据，设置订阅以及手动更改 React 组件中的 DOM 等。

## Class 组件 缺陷

- **难以复用组件间状态逻辑** - 代码冗余

  - 组件状态逻辑的复用，需要 **props render**和**高阶组件**等解决方案，造成层级冗余，嵌套地狱

- **难以维护复杂组件** - 逻辑混乱

  - 不同逻辑混杂在同一生命周期，相同逻辑却在不同生命周期
  - ==？组件常常充斥着状态逻辑的访问和处理，不能拆分为更小的粒度，可通过状态管理库集中管理状态，但耦合了状态管理库又会导致组件复用性降低==

- **this 指向问题** - 需手动绑定this

  - class 的方法默认不会绑定 this， this值为 undefined。方法中访问 this 则必须**在构造器中绑定**或**使用 class fields 语法**（实验性语法）

  ```jsx
  class Example extends React.Component {
   constructor(props) {
    ...
    // 方式1: 在构造函数中绑定 this
    this.handleClick = this.handleClick.bind(this);
   }
   handleClick() {
    this.setState({...})
   }
   
   // 方式2: 使用 class fields 语法
   handleClick = () => {
    this.setState({...})
   }
  }
  ```

- **难以对 class 进行编译优化** - 难以优化

  - 由于 JavaScript 历史设计原因，使用 class 组件会让组件预编译过程中变得难以进行优化，如 class 不能很好的压缩，并且会使热重载出现不稳定的情况

## HOOK 优势

- 自定义HOOK：不改变结构的情况下复用逻辑
- 更小拆分
- 非 class 的情况下使用更多 React 特性

# https://zh-hans.reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
