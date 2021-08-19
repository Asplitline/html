# Git

![05-1608907955424](Git_image/05-1608907955424.png)

| git仓库          | 暂存区             | 工作目录            |
| ---------------- | ------------------ | ------------------- |
| 用于存放提交记录 | 临时存放被修改文件 | 被Git管理的项目目录 |

## git配置

```shell
# 配置提交人姓名
git config --global user.name 提交人姓名
git config --global user.name myqz

# 配置提交人邮箱
git config --global user.email 提交人邮箱 
git config --global user.email ambition292@163.com

# 查看git配置信息
git config --list
```

## git提交

```shell
# 初始化git仓库
git init

# 查看文件状态
git status 

# 追踪文件,提交到暂存区
git add 文件列表
git add readme.md
git add . # 工作目录所有文件添加暂存区

# 向仓库中提交代码
git commit -m 提交信息  
git commit -m 添加readme

# 合并 add + commit
git commit -a -m 提交信息
# 查看提交记录
git log

```

## git撤销

 ```shell
# 用暂存区文件 >>覆盖>> 工作目录文件
git checkout 文件
  
# 将文件从暂存区中删除
# 工作目录中文件还存在
git rm --cached 文件

git rm -r --cached .  # 删除缓存文件，不会删除物理文件
# 将git仓库中指定的更新记录恢复出来，并且覆盖暂存区和工作目录
# 版本回退 git log 查看commitID -> 注意版本从高到低
git reset --hard commitID

 ```

## git其他

```shell

# 查看远程仓库别名
git remote -v

# 添加readme.md
# 创建readme.md 向其中插入 "first"
echo "first" > readme.md

# 删除文件 当前分支
git rm -r 文件名

# 命令参数列表
git 命令 -h # 简略
git 命令 --help #详细
```

##  git分支

**主分支**（master）：第一次向 git 仓库中提交更新记录时**自动产生的一个分支**。

**开发分支**（develop）：作为开发的分支，**基于 master 分支创建**。

**功能分支**（feature）：作为开发具体功能的分支，**基于开发分支创建**

**功能分支 -> 开发分支 -> 主分支**

### 分支命令

 ```shell
# 查看分支
git branch 
# 创建分支
git branch 分支名称

# 分支改名
git branch -m old new
git branch -m new # 当前分支改名

# 切换分支
git checkout 分支名称

# 删除分支（分支被合并后才允许删除） 强制删除
git branch -d 分支名称

git branch -a # 查看远端分支
git branch -v # 显示分支提交信息
#checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支
git checkout -b dev origin/dev
 ```

## merge

`git merge`：合并两个分支时会产生一个特殊的提交记录，它有两个父节点

## rebase

`git rebase`：取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去



## fetch

`git fetch`

- 远程下载本地缺失记录
- 更新远程分支指针

> 不会更改本地仓库状态

## pull

`git pull`：从远程仓库获取更新并合并到本地

`fetch` 和 `merge` 的缩写

`fetch`更新远程状态，`merge`最新状态和本地合并

## push

`git push` ： 将本地变更上传

> 不带参数，与`push.default`有关

## 偏易提交

远程提交一次记录，本地提交一次记录

合并两次记录，本地记录为最新

### rebase

```shell
git fetch
git rebase xx
git push
# 简写
git pull --rebase
git push
```

### merge

```shell
git fetch
git merge xx
git push
# 简写
git pull
git push
```

## 锁定的main

`remote rejected`：! [远程服务器拒绝] main -> main (TF402455: 不允许推送(push)这个分支; 你必须使用pull request来更新这个分支.)

**原因**：因为策略配置要求 `pull requests` 来提交更新，远程服务器**拒绝**直接推送(`push`)提交到`main`,

**解决**

```shell
git checkout -b xx # 新建分支
git push # 推送分支
git checkout main
git reset --hard o/main # 回滚
git checkout xx
```





## 暂时保存

暂时提取分支上所有的改动并存储，让开发人员得到一个干净的工作副本，临时转向其他工作。

**默认情况**

- 添加到暂存区的修改（staged changes）
- Git跟踪的但并未添加到暂存区的修改（unstaged changes）
不会缓存
- 在工作目录中新的文件（untracked files）
- 被忽略的文件（ignored files）

> 使用-u或者--include-untracked可以stash untracked文件
> 使用-a或者--all命令可以stash当前目录下的所有修改

**stash命令**

- 存储临时改动：`git stash`
> 添加笔记 git stash save 'this is stash'
- 恢复缓存
  - `git stash pop`
  - `git stash apply`

> pop会删除当前恢复缓存，apply不会
> apply 可以指定恢复缓存 ~~`git stash apply stash@{0}`~~  `git stash apply n`
- 查看临时改动列表：`git stash list`
- 查看stash文件区别：`git stash show`
> -p --patch 查看更详细信息
- 移除stash：`git stash drop stash@{0}`
- 清空stash：`git stash clear`

> 先提交到缓存区，才可以stash
> 在恢复的时候注意当前分支是否为当初保存的分支

# Github

## 推送仓库

### 推送一个新仓库

```shell
# 创建readme
echo "# book-system" >> README.md
# 初始化仓库
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Asplitline/book-system.git
git push -u origin main
```

### 推送一个本地仓库

```shell
git remote add origin https://github.com/Asplitline/book-system.git
git branch -M main
git push -u origin main
```

 ```shell
#  推送仓库
git push 远程仓库地址 分支名称
git push 远程仓库地址别名 分支名称 #需先取别名
git push # 需先记住地址
# 取别名
git remote add 远程仓库地址别名 远程仓库地址
# 记住地址
git push -u 远程仓库地址别名 分支名称
# -u 记住推送地址及分支，下次推送只需要输入git push即可
 ```

## 拉取仓库

### git clone

 ```shell
 # 克隆远端数据仓库到本地
 git clone 仓库地址
 # 远端代码
 git clone -b 分支 仓库地址
 # 拉取最新版本
 git pull 远程仓库地址 分支名称
 ```

### 下载 zip

```shell
# 下载 zip
# 解压 zip
# 初始化仓库
git init
# 添加远程仓库
git remote add origin https://....
# 拉取远程
git pull
```

## 冲突解决

两个人修改了同一个文件的同一个地方，就会发生冲突。冲突需要人为解决

- 推送到远程仓库产生冲突，冲突文件会显示具体信息
- 将冲突任务解决后，再进行推送

## 跨团队合作

1. 程序员 C fork仓库
2. 程序员 C 将仓库克隆在本地进行修改
3. 程序员 C 将仓库推送到远程
4. 程序员 C 发起pull reqest
5. 原仓库作者审核
6. 原仓库作者合并代码

## shell免登录

### 本地仓库

```shell
生成秘钥：ssh-keygen

秘钥存储目录：C:\Users\用户\\.ssh

公钥名称：id_rsa.pub

私钥名称：id_rsa
```
### 远程仓库

- 将公钥添加到ssh key
- 复制远程仓库 ssh地址

## git忽略清单
不需要被git管理的文件名字添加到此文件中，在执行git命令的时候，git就会忽略这些文件
> 文件名： **.gitignore**


# vscode 配置 gitbash

```shell
# 命令行获取 git路径
where git

# settings.json中配置
# "git.path": "D:\\git\\Git\\cmd\\git.exe" # 可选
"terminal.integrated.shell.windows": "D:\\git\\Git\\bin\\bash.exe"
```

# 实战

## git status检测不到文件变化

git管理软件SourceTree会遇到往项目里新增了文件，软件却没有任何反应的问题，

这多发生在git合并出错而只能重新git的情况下，可能的原因是之前提交的文件"缓存"还在，所以相同的文件再提交时无法被检测。

```shell
1. 首先, 提交全部更新

2. 执行 git rm -r --cached .  # 删除缓存文件，不会删除物理
# -r 循环删除

3. 执行 git add .

4. 执行 git commit -m .  # SourceTree自带推送按钮，这一步命令行可以省略.
```

## 拉取远端代码到本地

```shell
1.新建空文件
2.初始化
git init
3.添加远端仓库
git stat
```



