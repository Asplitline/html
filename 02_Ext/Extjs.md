# ExtJS

Ext JS是一个流行的JavaScript框架，它为使用跨浏览器功能构建Web应用程序提供了丰富的UI。
**Sencha CMD**：是一个提供Ext JS代码缩小，脚手架，生产构建生成功能的工具。

**Sencha IDE Plugins**：它将Sencha框架集成到IntelliJ，WebStorm IDE中。 这有助于通过提供代码完成，代码检查，代码导航，代码生成，代码重构，模板创建和拼写检查等功能来提高开发人员的生产力。

**Sencha Inspector**：是一个调试工具，帮助调试器调试任何问题，同时开发。

文件描述

| 文件                 | 内容                                                         |
| -------------------- | ------------------------------------------------------------ |
| **ext.js**           | 这是核心文件，其中包含运行应用程序的所有功能。               |
| **ext-all.js**       | 此文件包含在文件中没有注释的所有缩小的代码                   |
| **ext-all-debug.js** | 未分级版本，用于调试                                         |
| **ext-all-dev.js**   | 此未分级，用于开发目的，因为它包含所有注释和控制台日志，以检查任何错误/问题 |
| **ext-all.js**       | 生产，主要是因为它比任何其他小得多。                         |

**app.js:**程式流程**开始的主要档案**，应该使用标签。 应用程序调用应用程序的控制器的其余功能。

**Controller.js:**它是Ext JS MVC架构的控制器文件。 这包含应用程序的所有控制，**事件侦听器的最大功能的代码**。 它具有为该应用程序中使用的所有其他文件定义的路径，例如store，view，model，require，mixins。

**View.js:**它包含应用程序的**界面部分**，显示给用户。

**Store.js:**它包含**本地缓存的数据**，它将在模型对象的帮助下在视图上呈现。 存储使用代理获取数据，代理具有为服务定义的路径以获取后端数据。

**Model.js:**它包含绑定要**查看的商店数据的对象**。 它有后端数据对象到视图dataIndex的映射。 在store的帮助下获取数据。

**Utils.js:**不包括在MVC架构中，使代码清晰，不太复杂，更加可读。 

## 第一个项目

通过 cdn 引入 ext

```html
 <link href="https://cdn.bootcss.com/extjs/6.0.0/classic/theme-classic/resources/theme-classic-all.css" rel="external nofollow" target="_blank"  rel="stylesheet">

<script src="https://cdn.bootcss.com/extjs/6.0.0/ext-all.js" rel="external nofollow" ></script>
```

```html
<!DOCTYPE html>
<html>
   <head>
      <link href="https://cdn.bootcss.com/extjs/6.0.0/classic/theme-classic/resources/theme-classic-all.css" rel="external nofollow" target="_blank"  rel="stylesheet">
      <script src="https://cdn.bootcss.com/extjs/6.0.0/ext-all.js" rel="external nofollow" ></script>
      <script type="text/javascript">
         Ext.onReady(function() {
         Ext.create('Ext.Panel', {
            renderTo: 'helloWorldPanel',
            height: 200,
            width: 600,
            title: 'Hello world',
            html: 'First Ext JS Hello World Program'
            });
         });
      </script>
   </head>
   <body>
      <div id="helloWorldPanel" />
   </body>
</html>
```

说明

- `Ext.onReady()`：Ext JS准备好**渲染Ext JS元素时调用**。
- `Ext.create()`：Ext JS中**创建对象**，这里我们创建一个简单的面板类Ext.Panel的对象。
- `Ext.Panel`：Ext JS中用于**创建面板的预定义类**

`Ext.Panel`类有以下各种属性:

- `renderTo` ：面板必须呈现的元素
- `Height width` ：面板宽高
- `Title`：面板提供标题
- `Html` ：面板中显示的html内容

## Ext.js -  Class

Ext JS 是一个 JavaScript 框架，它具有面向对象编程的功能

### 定义类

`Ext.define()`用于在 Ext JS 中定义类

```js
Ext.define(class name, class members/properties, callback function);
```

- name - 应用结构 类名称
- members/properties - 定义类的行为
- function - 回调函数

```js
Ext.define(studentApp.view.StudentDeatilsGrid, {
   extend : 'Ext.grid.GridPanel',
   id : 'studentsDetailsGrid',
   store : 'StudentsDetailsGridStore',
   renderTo : 'studentsDetailsRenderDiv',
   layout : 'fit',
   columns : [{
      text : 'Student Name',
      dataIndex : 'studentName'
   },{
      text : 'ID',
      dataIndex : 'studentId'
   },{
      text : 'Department',
      dataIndex : 'department'
   }]
});
```

### 创建对象

在 Ext JS 创建对象

`new` 关键字

```js
var studentObject = new student();
studentObject.getStudentName();
```

`Ext.create()`

```js
Ext.create('Ext.Panel', {
   renderTo : 'helloWorldPanel',
   height : 100,
   width : 100,
   title : 'Hello world',
   html : 'First Ext JS Hello World Program'		
});
```

### 继承

继承是将类 A 中定义的功能用于类 B 的原理

`Ext.extend`

```js
Ext.define(studentApp.view.StudentDetailsGrid, {
   extend : 'Ext.grid.GridPanel',
   ...
});
```

`Mixins`

在没有扩展的情况下在类 B 中使用类 A 的不同方式

```js
mixins : {
   commons : 'DepartmentApp.utils.DepartmentUtils'
},
```

## Ext.js - 集装箱

Ext JS容器：`Ext.container.Container`是Ext JS中所有容器的基类

- 可以具有**多个布局**以将部件布置在容器中
- 可以**添加**其他容器或子组件的组件
- 可以从容器和其子元素**添加或删除**组件

### 容器 - Ext.container.Container

在其他容器内部的容器作为父容器的组件以及其他组件

```js
   var container = Ext.create('Ext.container.Container', {
      items: [component3, component4]
   });
   Ext.create('Ext.container.Container', {
      renderTo: Ext.getBody(),
      items: [container]
   });
```

### 组件 -Ext.Component

在容器内部有多个组件

```js
   var component1 = Ext.create('Ext.Component', {
      html:'First Component'
   });
   Ext.create('Ext.container.Container', {
      renderTo: Ext.getBody(),
      items: [component1]
   });
```

### 面板 - Ext.panel.Panel

面板中添加项目的基本容器

```js
Ext.create('Ext.panel.Panel', {
   items: [child1, child2] // 这样我们可以将不同的子元素作为容器项添加到容器中
});
```

### 表单 - Ext.form.Panel

自动创建一个用于管理任何Ext.form.field.Field对象的BasicForm。

```js
Ext.create('Ext.form.Panel', {
   items: [child1, child2] // 这样我们可以将不同的子元素作为容器项添加到容器中。
});
```

### 标签 - Ext.tab.Panel

支持卡标签面板布局

```js
Ext.create('Ext.tab.Panel', {
   items: [child1, child2] // 这样我们可以将不同的子元素作为容器项添加到容器中。
});
```

在listeners中监听，通过render在初次渲染此弹出 消息

```js
Ext.onReady(function () {
  Ext.create('Ext.tab.Panel', {
    renderTo: Ext.getBody(),
    height: 100,
    width: 200,
    items: [{
      xtype: 'panel',
      title: 'Tab One',
      html: 'The first tab',
      listeners: {
        render: function () {
          Ext.MessageBox.alert('Tab one', 'Tab One was clicked.');
        }
      }
    }, {
      // xtype for all Component configurations in a Container
      title: 'Tab Two',
      html: 'The second tab',
      listeners: {
        render: function () {
          Ext.MessageBox.alert('Tab two', 'Tab Two was clicked.');
        }
      }
    }]
  });
});
```

### 全屏容器 - Ext.container.Viewport

会自动调整大小到整个浏览器窗口的大小

```js
Ext.create('Ext.container.Viewport', {
   items: [child1, child2] // 这样我们可以将不同的子元素作为容器项添加到容器中。
});
```

## Ext.js - 布局 

布局是元素在容器中排列的方式。 这可以是水平的，垂直的或任何其他。

### 绝对布局 - abolute

允许使用容器中的XY坐标定位项目

```shell
 layout: 'absolute' 
```

通过 x，y控制元素位置

```js
Ext.onReady(function () {
  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: 'absolute',
    items: [{
      title: 'Panel 1',
      x: 50,
      y: 50,
      html: 'Positioned at x:50, y:50',
      width: 500,
      height: 100
    }, {
      title: 'Panel 2',
      x: 100,
      y: 95,
      html: 'Positioned at x:100, y:95',
      width: 500,
      height: 100
    }]
  });
});
```

### 手风琴布局 - accordion

允许将所有项目以堆叠方式（一个在另一个之上）放在容器内

```js
 layout: 'accordion' 
```

```js
Ext.onReady(function () {
  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: 'accordion',
    width: 600,
    items: [{
      title: 'Panel 1',
      html: 'Panel 1 html content'
    }, {
      title: 'Panel 2',
      html: 'Panel 2 html content'
    }, {
      title: 'Panel 3',
      html: 'Panel 3 html content'
    }, {
      title: 'Panel 4',
      html: 'Panel 4 html content'
    }, {
      title: 'Panel 5',
      html: 'Panel 5 html content'
    }]
  });
});
```

### 锚点布局 - anchor

给出每个元素相对于容器大小的大小的特权

```
 layout: 'anchor' 
```

```js
anchor: '100%'     // 宽度100%,高度自动
anchor: '100% 50%' 
anchor: '-50' // 宽度减50
anchor: '-50 -100' 
```

```js
Ext.onReady(function () {
  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: 'anchor',
    width: 600,
    items: [
      {
        title: 'Panel 1',
        html: 'panel 1',
        height: 100,
        anchor: '50%'
      }, {
        title: 'Panel 2',
        html: 'panel 2',
        height: 100,
        anchor: '100%'
      }, {
        title: 'Panel 3',
        html: 'panel 3',
        height: 100,
        anchor: '-100'
      },
      {
        title: 'Panel 4',
        html: 'panel 4',
        anchor: '-70, 500'
      }]
  });
});
```



### 边框布局 - border

布局包含多个字面板，它将整个容器分为5个部分，分别是**east, south, west, north, center**

```js
 layout: 'border' 
```

### 自动布局 - auto

根据元素数量决定元素的布局

```js
 layout: 'auto' 
```

### 卡片标签布局 - card_panel

以制表符方式排列不同的组件。 选项卡将显示在容器的顶部。每次只有一个选项卡可见，每个选项卡被视为不同的组件。

```js
Ext.onReady(function () {
  Ext.create('Ext.tab.Panel', {
    renderTo: Ext.getBody(),
    requires: ['Ext.layout.container.Card'],
    xtype: 'layout-cardtabs',
    width: 600,
    height: 200,
    items: [{
      title: 'Tab 1',
      html: 'This is first tab.'
    }, {
      title: 'Tab 2',
      html: 'This is second tab.'
    }, {
      title: 'Tab 3',
      html: 'This is third tab.'
    }]
  });
});
```

### 卡片向导布局 - card_wizard

管理多个子组件，并且在任何时刻只能显示一个子组件

```js
 layout: 'card' 
```

- setActiveItem()：指定某一个面板的显示。

- getNext()或getPrev()：下一个或上一个面板。
- setDisabled()：设置面板的显示。

```js
Ext.application({
  name: 'HelloExt',
  launch: function () {
    var navigate = function (panel, direction) {
      var layout = panel.getLayout();
      layout[direction]();
      Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
      Ext.getCmp('move-next').setDisabled(!layout.getNext());
    };
    Ext.create('Ext.panel.Panel', {
      title: 'Card布局示例',
      width: 300,
      height: 202,
      layout: 'card',
      activeItem: 0,
      x: 30,
      y: 60,
      bodyStyle: 'padding:15px',
      defaults: { border: false },
      bbar: [{
        id: 'move-prev',
        text: '上一步',
        handler: function (btn) {
          navigate(btn.up("panel"), "prev");
        },
        disabled: true
      },
        '->',
      {
        id: 'move-next',
        text: '下一步',
        handler: function (btn) {
          navigate(btn.up("panel"), "next");
        }
      }],
      items: [{
        id: 'card-0',
        html: '<h1>第一步</h1>'
      },
      {
        id: 'card-1',
        html: '<h1>第二步</h1>'
      },
      {
        id: 'card-2',
        html: '<h1>最后一步</h1>'
      }],
      renderTo: Ext.getBody()
    });
  }
});
```

### 列布局 - column

在容器中显示多个列。 我们可以定义列的固定宽度或百分比宽度。

```js
 layout: 'column' 
```

`columnWidth`控制宽度

```js
Ext.onReady(function () {
  Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    layout: 'column',
    xtype: 'layout-column',
    requires: ['Ext.layout.container.Column'],
    width: 600,
    items: [{
      title: 'First Component width 30%',
      html: 'This is First Component',
      columnWidth: 0.30
    }, {
      title: 'Second Component width 40%',
      html: '<p> This is Second Component </p> <p> Next line for second component </p>',
      columnWidth: 0.40
    }, {
      title: 'Third Component width 30%',
      html: 'This is Third Component',
      columnWidth: 0.30
    }]
  });
});
```

### 自适应布局 - fit

用单个面板填充，并且当没有与布局相关的特定要求时，则使用该布局

```js
 layout: 'fit' 
```

`defaults`：控制公共样式

```js
Ext.onReady(function () {
  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: {
      type: 'fit'
    },
    width: 600,
    defaults: {
      bodyPadding: 15
    },
    items: [{
      title: 'Panel1',
      html: 'This is panel 1'
    }, {
      title: 'Panel2',
      html: 'This is panel 2'
    }, {
      title: 'Panel3',
      html: 'This is panel 3'
    }, {
      title: 'Panel4',
      html: 'This is panel 4'
    }]
  });
});
```

### 表格布局 - table

表格式在容器中排列组件

```js
 layout: 'table' 
```

`colspan`：跨列

`rowspan`：跨行

```js
Ext.onReady(function () {
  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    layout: {
      type: 'table',
      columns: 3,
      tableAttrs: {
        style: {
          width: '100%'
        }
      }
    },
    width: 600,
    height: 200,
    items: [{
      title: 'Panel1',
      html: 'This panel has colspan = 2',
      colspan: 2
    }, {
      title: 'Panel2',
      html: 'This panel has rowspan = 2',
      rowspan: 2
    }, {
      title: 'Panel3',
      html: 'This  s panel 3'
    }, {
      title: 'Panel4',
      html: 'This is panel 4'
    }, {
      title: 'Panel5',
      html: 'This is panel 5'
    }]
  });
});
```

### 垂直分布布局 - vbox

允许元素以垂直方式分布

```js
 layout: 'vbox' 
```

`flex`： 占比

```js
Ext.onReady(function () {
  Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    requires: ['Ext.layout.container.VBox'],
    xtype: 'layout-vertical-box',
    width: 600,
    height: 400,
    frame: true,
    items: [{
      title: 'Panel 1',
      html: 'Panel with flex 1',
      margin: '0 0 10 0',
      flex: 1
    }, {
      title: 'Panel 2',
      html: 'Panel with flex 2',
      margin: '0 0 10 0',
      flex: 2
    }, {
      title: 'Panel 3',
      flex: 2,
      margin: '0 0 10 0',
      html: 'Panel with flex 2'
    }, {
      title: 'Panel 4',
      html: 'Panel with flex 1',
      margin: '0 0 10 0',
      flex: 1
    }]
  });
});
```

### 水平分布布局 - hbox

元素以水平方式分布

```js
 layout: 'hbox' 
```

```js
Ext.onReady(function () {
  Ext.create('Ext.panel.Panel', {
    renderTo: Ext.getBody(),
    layout: {
      type: 'hbox'
    },
    requires: ['Ext.layout.container.HBox'],
    xtype: 'layout-horizontal-box',
    width: 600,
    frame: true,
    items: [{
      title: 'Panel 1',
      html: 'Panel with flex 1',
      flex: 1
    }, {
      title: 'Panel 2',
      html: 'Panel with flex 2',
      flex: 2
    }, {
      title: 'Panel 3',
      width: 150,
      html: 'Panel with width 150'
    }, {
      title: 'Panel 4',
      html: 'Panel with flex 1',
      flex: 1
    }]
  });
});
```

## Ext.js 组件

| 编号         | 方法＆说明                                                   |
| ------------ | ------------------------------------------------------------ |
| Grid         | 以表格格式显示数据。                                         |
| Form         | 窗体小部件是从用户获取数据。                                 |
| MessageBox   | 消息框基本上用于以警报框的形式显示数据。                     |
| Chart        | 用于以图形格式表示数据。                                     |
| Tooltip      | 任何事件发生时，工具提示用于显示一些基本信息。               |
| Window       | 创建一个窗口，当任何事件发生时应该弹出。                     |
| HTML editor  | HTML编辑器是非常有用的UI组件之一，用于对用户输入的字体，颜色，大小等数据进行样式设置。 |
| Progress bar | 显示后端工作的进度。                                         |

### messageBox - 消息

| 编号                                                         | 消息框                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Basic alert box](https://www.w3cschool.cn/extjs/alertbox.html) | 这是最简单的警报框只是为了显示一些事件的一些信息。           |
| [Confirm box](https://www.w3cschool.cn/extjs/confirmbox.html) | 此消息框要求用户确认以及对不同选项用户选择调用的不同方法为yes或no。 |
| [Prompt box](https://www.w3cschool.cn/extjs/promptbox.html)  | 消息框提示用户输入。                                         |
| [multiline User input box](https://www.w3cschool.cn/extjs/inputbox.html) | 提示框，但它允许用户输入多线信息，而不只是一行。             |
| [Yes No Cancle alert box](https://www.w3cschool.cn/extjs/cancelbox.html) | 确认框，它询问用户一些确认是否用户想做任务或拒绝或基于用户选择取消任务不同的方法被调用。 |

### Chart - 图表

图表用于以图形格式表示数据。 以下是Ext JS提供的不同图表：

| 图表                                                         |
| ------------------------------------------------------------ |
| [Pie Chart](https://www.w3cschool.cn/extjs/piechart.html)：名称表示此图表用于以饼图格式表示数据。 |
| [Line Chart](https://www.w3cschool.cn/extjs/linechart.html)：以线图格式表示数据。 |
| [Bar Chart](https://www.w3cschool.cn/extjs/barchart.html)：以条形图格式表示数据。 |
| [Area Chart](https://www.w3cschool.cn/extjs/areachart.html)：以面积图形式表示数据。 |

### Tooltip

用于悬停事件

```js
 T1 = new 'Ext.ToolTip'({properties});
```

```js
Ext.onReady(function () {
  toolTip = new Ext.ToolTip({
    id: 'toolTip',
    anchor: 'bottom',
    html: 'This is a basic toolTip',
    title: 'Tool - Tip Title',
    closable: true,
    closeAction: 'hide'
  });
  Ext.create('Ext.Button', {
    renderTo: Ext.getElementById('buttonId'),
    text: 'Hover Me',
    listeners: {
      mouseover: function () {
        toolTip.show();
      }
    }
  });
});
```

### window - 对话窗口

创建一个窗口，当任何事件发生时应该弹出窗口

```js
 win = new Ext.Window({ properties });
```

### Html editor - 富文本

创建一个html编辑器，以便用户可以编辑它在字体，颜色，大小等方面输入的信息

```
 Ext.create('Ext.form.HtmlEditor')
```

### Progress bar - 进度条

显示完成的工作的进度

```js
 Ext.MessageBox.show({
   title: 'Please wait',
   msg: 'Loading items...',
   progressText: 'Initializing...',
   width:300,
   progress:true,
   closable:false
});
```

## Ext.js 拖放

将类拖放到可拖动目标。

```js
   var dd = Ext.create('Ext.dd.DD', el, 'imagesDDGroup', {
       isTarget: false
   });
```

添加拖放目标类到drappable目标

```js
   var mainTarget = Ext.create('Ext.dd.DDTarget', 'mainRoom', 'imagesDDGroup', {
      ignoreSelf: false
   });
```

[Ext.js 网格到网格拖放](https://www.w3cschool.cn/extjs/gridtogrid.html)
[Ext.js 网格到表单拖放](https://www.w3cschool.cn/extjs/gridtoform.html)

## Ext.js 事件与监听

事件是在类发生的时候触发的。 

### 内置事件使用侦听器

```js
Ext.onReady(function () {
  Ext.get('tag2').hide()
  Ext.create('Ext.Button', {
    renderTo: Ext.getElementById('helloWorldPanel'),
    text: 'My Button',
    listeners: {
      click: function () {
        this.hide();
      },
      hide: function () {
        Ext.get('tag1').hide();
        Ext.get('tag2').show();
      }
    }
  });
});
```

### 稍后再附加事件

在 dom创建后监听事件

```js
 Ext.onReady(function () {
      var button = Ext.create('Ext.Button', {
        renderTo: Ext.getElementById('helloWorldPanel'),
        text: 'My Button'
      });

      // This way we can attach event to the button after the button is created.
      button.on('click', function () {
        Ext.MessageBox.alert('Alert box', 'Button is clicked');
      });
    });
```

### 自定义事件

```js
Ext.onReady(function () {
  var button = Ext.create('Ext.Button', {
    renderTo: Ext.getElementById('helloWorldPanel'),
    text: 'My Button',
    listeners: {
      myEvent: function (button) {
        Ext.MessageBox.alert('Alert box', 'My custom event is called');
      }
    }
  });
  Ext.defer(function () {
    button.fireEvent('myEvent');
  }, 5000);
});
```

## Ext.js 数据

数据包用于加载和保存应用程序中的所有数据。

- 模型
- 商店
- 代理

### 模型

modal的基类是`Ext.data.Model.It`，应用程序中的一个实体。

**将存储数据绑定到视图**

#### 创建模型

为了创建一个模型，我们需要扩展`Ext.data.Model类`，我们需要定义字段的名称和映射。

```js
   Ext.define('StudentDataModel', {
      extend: 'Ext.data.Model',
      fields: [
      {name: 'name', mapping : 'name'},
      {name: 'age', mapping : 'age'},
      {name: 'marks', mapping : 'marks'}
      ]
   });
```

这里的名称应该与我们在视图中声明的dataIndex相同，并且映射应该匹配使用store从数据库获取的静态或动态数据。

### 商店

store的基类是`Ext.data.Store`。 

包含本地缓存的数据，该数据将在**模型对象**的帮助下在视图上呈现。

 存储**使用代理获取数据**，代理具有为服务定义的路径以获取后端数据。

存储数据可以从静态或动态两种方式获取。

#### 静态存储

对于静态存储，我们将存储在存储中的所有数据如下:

```
   Ext.create('Ext.data.Store', {
      model: 'StudentDataModel',
      data: [
         { name : "Asha", age : "16", marks : "90" },
         { name : "Vinit", age : "18", marks : "95" },
         { name : "Anand", age : "20", marks : "68" },
         { name : "Niharika", age : "21", marks : "86" },
         { name : "Manali", age : "22", marks : "57" }
      ];
   });
```

#### 动态存储

可以使用代理获取动态数据。 我们可以让代理可以从Ajax，Rest和Json获取数据。

### 代理

代理的基类是Ext.data.proxy.Proxy。 代理由模型和商店用于处理模型数据的加载和保存。

有两种类型的代理:

1. 客户端代理
2. 服务器代理

#### 客户端代理

客户端代理包括使用HTML5本地存储的内存和本地存储。

#### 服务器代理

服务器代理使用Ajax，Json数据和Rest服务处理来自远程服务器的数据。

定义服务器中的代理：

```js
Ext.create('Ext.data.Store', {
   model: 'StudentDataModel',
   proxy : {
      type : 'rest',
      actionMethods : {
         read : 'POST'  // Get or Post type based on requirement
      },
      url : 'restUrlPathOrJsonFilePath', // here we have to include the rest URL path which fetches data from database or Json file path where the data is stored
      reader: {
         type : 'json',  // the type of data which is fetched is of JSON type
         root : 'data'
      },
   }
});
```
