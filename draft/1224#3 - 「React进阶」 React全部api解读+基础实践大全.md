https://juejin.cn/post/6950063294270930980?share_token=d4f0d3fa-c2b0-4667-9868-ddefa4624eb1

react对Component处理
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
updater对象上保存着更新组件的方法。

实例化类组件
function constructClassInstance(
    workInProgress,
    ctor,
    props
){
   const instance = new ctor(props, context);
    instance.updater = {
        isMounted,
        enqueueSetState(){
            /* setState 触发这里面的逻辑 */
        },
        enqueueReplaceState(){},
        enqueueForceUpdate(){
            /* forceUpdate 触发这里的逻辑 */
        }
    }
}
PureComponent
null
纯组件PureComponent会浅比较，props和state是否相同，来决定是否重新渲染组件。所以一般用于性能调优，减少render次数。
‌浅拷贝就能根本解决问题
memo
React.memo和PureComponent作用类似
区别PureComponent是 React.memo只能对props的情况确定是否渲染，而PureComponent是针对props和state。
React.memo 接受两个参数，第一个参数原始组件本身，第二个参数，可以根据一次更新中props是否相同决定原始组件是否重新渲染。
React.memo: 第二个参数 返回 true 组件不渲染 ， 返回 false 组件重新渲染。 shouldComponentUpdate: 返回 true 组件渲染 ， 返回 false 组件不渲染。

‌控制组件在仅此一个props数字变量，一定范围渲染
React.memo一定程度上，可以等价于组件外部使用shouldComponentUpdate ，用于拦截新老props，确定组件是否更新。
forwardRef
1 转发引入Ref
隔代ref获取引用
forwardRef:把ref转发到自定义的forwardRef定义的属性上，让ref，可以通过props传递。
2 高阶组件转发Ref
‌? 如果是类组件，是通过ref拿不到原始组件
￼
的实例的，不过我们可以通过forWardRef转