# npm

## 配置镜像

## config - 配置

### 配置镜像

```shell
# 淘宝源
npm config set registry http://registry.npm.taobao.org/

npm info underscore （如果上面配置正确这个命令会有字符串response）

npm --registry https://registry.npm.taobao.org info underscore 

# 官方源
npm config set registry https://registry.npmjs.org/
```

### 配置查看

```shell
# 查看npm配置
npm config ls 
# 查看包信息
npm info axios
# 查看源
npm config get registry 
# 查看文档
npm docs axios
# 查看源码
npm repo axios
# 查看目录
npm root -g
```

## install  - 安装

```shell
# 开发依赖
npm install <package> --save-dev | -D
# 生产依赖
npm install <package> --save-prod | -P
# 重新下载所有包
npm run rebuild 
```

```shell
# 清除缓存
npm cache clean --force
```

# [yarn](https://yarnpkg.com/)

## config - 配置

### 全局配置文件

```shell
cd 
subl .npnrc
```

### [改变缓存位置](https://zhuanlan.zhihu.com/p/380723351)

```shell
# 查看配置
yarn config list

# yarn bin 位置
yarn global bin
yarn config  set global-folder "D:/yarn/global"

# yarn 全局安装位置
yarn global dir
yarn config set cache-folder "D:\yarn\cache"
```

### 配置镜像

```shell
yarn config get registry
# 淘宝源
yarn config set registry http://registry.npm.taobao.org/
# 官方源
yarn config set registry https://registry.npmjs.org/
```

## install - 安装

```bash
yarn
yarn install
# 重新下载所有包
yarn install --force 
```

```bash
# 清除缓存
yarn cache clean
```

## add - 添加

```shell
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

# devDependencies - peerDependencies - optionalDependencies
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

例子

```bash
yarn add package-1@1.2.3
yarn add package-2@^1.0.0
yarn add package-3@beta
```

## upgrade - 升级

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

### npm-check-updates

```shell
# 安装 npm-check-updates
yarn global add npm-check-updates
 
# 更新包（yarn.lock和package.json同步更新）
 
ncu --upgrade --upgradeAll && yarn upgrade
```

### upgrade-interactive

```shell
yarn upgrade-interactive --latest
 
# 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
```

### upgrade

```shell
yarn upgrade package@version

# yarn.lock和package.json都会更新，但是会锁定版本
```

## remove - 移除

```bash
yarn remove [package]
```

## link - 链接

1. 通过 link 链接本地依赖 

```bash
npm clone 模块到本地

# 模块和项目在同一目录下
npm link ../module

# 模块和项目不在同一目录下
# 先去到模块目录，把它 link 到全局
cd ../npm-link-test
npm link

# 再去项目目录通过包名来 link
cd ../my-project-link
npm link test-npm-link(模块包名，即：package.json中name)

# 在项目目录下，解除项目与模块的link
npm unlink 模块名

# 在模块目录下：解除模块全局的link
npm unlink 模块名
```

2. 直接添加本地依赖

```shell
# 链接本地包 - 相对路径
yarn add  @pancakeswap/uikit "file:../pancake-toolkit/packages/pancake-uikit"

# 绝对路径
yarn add  @pancakeswap/uikit "D:\\project\\2021\\company\\pawswap\\pancake-toolkit\\packages\\pancake-uikit"

# ? 存在问题
yarn link @pancakeswap/uikit 
```

3. 重新安装

```shell
yarn install --force
```

> 建议 直接在 package.json 中添加，然后  yarn install --force

# yrm

npm 使用 `nrm`，通`yrm`

yrm 不仅可以快速切换镜像源，还可以测试自己网络访问不同源的速度

安装 yrm

```shell
npm install -g yrm 
```

列出当前可用的所有镜像源

```shell
yrm ls
```

```shell
npm -----  https://registry.npmjs.org/
cnpm ----  http://r.cnpmjs.org/
taobao --  https://registry.npm.taobao.org/
nj ------  https://registry.nodejitsu.com/
rednpm -- http://registry.mirror.cqupt.edu.cn
skimdb -- https://skimdb.npmjs.com/registry
yarn ----  https://registry.yarnpkg.com
```
使用淘宝镜像源

```shell
yrm use taobao
```


测试访问速度

```shell
yrm test taobao
```

# nvm

node 包管理器

```shell
https://github.com/coreybutler/nvm-windows/releases
```

```shell
# nvm 版本
nvm version

# 安装 node.js 版本
nvm install 12.14.0

# 切换 node.js 版本
nvm use 12.14.0

# node.js 版本列表
nvm list
```



# 问题

## node-sass

```shell
 yarn add sass-loader@^10.1.1
```

## production

==如果production 为 true 将不会安装  开发依赖==

```bash

npm config get production

npm config set production false
```

## RequestError

connect ETIMEDOUT 20.205.243.166:443

1. cmd中 ping github.com ，是否能够正常连接
2. 不能正常连接，在 `C:\Windows\System32\drivers\etc`目录下host 文件下添加 

```bash
140.82.114.3 github.com
```

> 140.82.114.3获取：在 https://ipaddress.com/ 中，搜索 github.com



# 配置代理

```bash
# cmd 配置临时代理
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
# 查看配置状态
echo %http_proxy%

# powershell 设置代理
netsh winhttp set proxy "127.0.0.1:1080"
netsh winhttp reset proxy 
# 查看代理
netsh winhttp show proxy

# git 配置局部代理
git config http.proxy http://127.0.0.1:1080
git config https.proxy http://127.0.0.1:1080

git config http.proxy socks5://127.0.0.1:1080
git config https.proxy socks5://127.0.0.1:1080

# 删除局部代理
git config --unset http.proxy 
git config --unset https.proxy 

# npm 配置代理
npm config set proxy http://127.0.0.1:1080
npm config set https-proxy http://127.0.0.1:1080

npm config delete proxy
npm config delete https-proxy
# 查看状态
git config --list

# yarn 代理
yarn config list

yarn config set proxy http://127.0.0.1:1080
yarn config set https-proxy http://127.0.0.1:1080

yarn config delete proxy
yarn config delete https-proxy
```

