# less

Less（LeanerStyle Sheets 的缩写）是一门 CSS扩展语言，也成为CSS预处理器。

Less中文网址：[http://](http://lesscss.cn/)[less](http://lesscss.cn/)[css.cn/](http://lesscss.cn/)

```shell
npm install -g less # 安装
lessc -v # 查看版本
```

# scss

```bash
base.scss # 基础
iconfont.scss # 字体图标
index.scss # 入口文件
mixin.scss # 混入
reset.scss # 样式重置
variable.scss # 变量
```



# 全局变量

### create-react-app 

#### 引入scss

```bash
npm install -g create-react-app
create-react-app my-app

cd my-app
npm start
```

```bash
npm install sass-loader node-sass --save-dev
```

#### 配置全局变量

```bash
npm install --save-dev sass-resources-loader 

npm run eject # 暴露webpack配置
```

```json
 {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
          // includePaths: [path.join(__dirname, "/src/assets/scss/index.scss")]
        },
        'sass-loader'
      ).concat([
           {
               loader: "sass-resources-loader",
               options: {
                   resources: path.join(__dirname, "../src/assets/scss/index.scss")
               }
           }
      ]),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
},
{
     test: sassModuleRegex,
     use: getStyleLoaders(
       {
         importLoaders: 2,
         sourceMap: isEnvProduction && shouldUseSourceMap,
         modules: true,
         getLocalIdent: getCSSModuleLocalIdent,
       },
       'sass-loader'
     ).concat([
       {
           loader: "sass-resources-loader",
           options: {
               resources: path.join(__dirname, "../src/assets/scss/index.scss")
           }
       }
     ]),
},
```

配置多文件

```json
resources: [
    './path/to/vars.scss',
    './path/to/mixins.scss',
    './path/to/functions.scss'
]
```

