# Redux

`redux`：js状态管理

`react-redux`：基于`react` 状态管理

`Redux` 是 `JavaScript` 应用的状态容器，**提供可预测的状态管理**。

## 安装

### ？ [Redux Toolkit](http://cn.redux.js.org/introduction/getting-started#redux-toolkit)

```shell
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```

### 创建 React-Redux 应用

基于 [Create React App](https://github.com/facebook/create-react-app)，它利用了 **[Redux Toolkit](https://redux-toolkit.js.org/)** 和 Redux 与 React 组件的集成.

```shell
npx create-react-app my-app --template redux
```

### Redux 核心库

```shell
# NPM
npm install redux

# Yarn
yarn add redux
```

### 配套工具

```shell
npm install react-redux
npm install --save-dev redux-devtools
```

### 基础示例

全局状态以对象树的方式存放于单个 `store`。 唯一改变状态树（`state tree`）的方法是创建 `action`，一个描述发生了什么的对象，并将其 `dispatch` 给 `store`。

*唯一改变状态树方法*：**创建 `action`，并将其 `dispatch` 给 `store`**

```jsx
import { createStore } from 'redux'

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object.  It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()))

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'counter/incremented' })
// {value: 1}
store.dispatch({ type: 'counter/incremented' })
// {value: 2}
store.dispatch({ type: 'counter/decremented' })
// {value: 1}
```

### ？[Toolkit 示例](http://cn.redux.js.org/introduction/getting-started#redux-toolkit-%E7%A4%BA%E4%BE%8B)

## 核心概念

`store`：存放数据的仓库

`state`：数据

`action`：描述发生了什么的对象，更清晰监听数据

`dispath`：分发`action`，唯一更改`state`的方式。dispath 会返回 action

`reducer`：为了接收 `state`和`action`返回一个新`state`

### 基础示例



## ？[学习资源](http://cn.redux.js.org/introduction/learning-resources)

## ？[生态](http://cn.redux.js.org/introduction/ecosystem)

## ?  [示例](http://cn.redux.js.org/introduction/examples)

## 循序渐进

展示组件 和 容器组件

