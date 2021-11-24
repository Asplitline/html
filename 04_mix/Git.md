# Git

| git仓库          | 暂存区             | 工作目录            |
| ---------------- | ------------------ | ------------------- |
| 用于存放提交记录 | 临时存放被修改文件 | 被Git管理的项目目录 |

## 基础

### 提交暂存区

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

# 修改提交内容
git commit --amend
```

### 回退

`checkout`：*切换分支* 或者 *还原工作树文件*

 ```shell
# 利用缓存区文件覆盖物理文件
git checkout 文件
  
# 删除缓存区文件，文件还在
git rm --cached 文件
git rm -r --cached . 

# 将git仓库中指定的更新记录恢复出来，并且覆盖暂存区和工作目录
git reset --hard commitID
 ```

## linux - 基础命令

```shell
# 添加readme.md
# 创建readme.md 向其中插入 "first"
echo "first" > readme.md

# 新建文件
touch <file>
# 新建文件夹
mkdir <folder>
```

## git - 基础命令

```shell
# 命令参数列表
git 命令 -h # 简略
git 命令 --help #详细
```

##  branch - 分支命令

**主分支**（master）：第一次向 git 仓库中提交更新记录时**自动产生的一个分支**。

**开发分支**（develop）：作为开发的分支，**基于 master 分支创建**。

**功能分支**（feature）：作为开发具体功能的分支，**基于开发分支创建**

**功能分支 -> 开发分支 -> 主分支**

### 分支命令 

 ```shell
# 查看分支
git branch 
# 创建分支
git branch <branch_name>

# 分支改名
git branch -m old new
git branch -m new # 当前分支改名

# 切换分支
git checkout 分支名称


git branch -a # 查看所有分支（包括远端）
git branch -v # 显示分支提交信息


# checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支
git checkout -b dev origin/dev
# 删除远程分支
git push origin --delete 分支名称 # --delete 简写 -d
 ```

```shell
# 查看已合并分支
git branch --merged
# 查看未合并分支
git branch --no-merged
# 删除分支（分支被合并后才允许删除）
git branch -d <branch_name>
# 强制删除分支
git branch -D <branch_name>
```

## rebase - replace base

合并记录出现原因：从 master 分支新建分支，并且master分支由新的提交记录。此时新建分支还指向旧的master

rebase：将分支出发点从 旧master 移动到 新master。

> 如果 master分支没有新记录，此时合并只会移动指针（`fast-forward`）

解决问题

- 将提交记录变为线性
- 传统合并，master并分支新分支，合并冲突由 master处理。通过 新分支rebase，可以将冲突，交由 分支开发者处理。

`git rebase`：取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去

## push - 推送本地仓库

`git push` ： 将本地变更上传

```shell
# 添加别名
git remote add <remote_alias> <remote_url>
# 记住本次推送的分支和别名
git push -u <remote_alias> <branch_name>
# 推送仓库
git push <remote_url> <branch_name>
git push <remote_alias> <branch_name> #需先取别名
git push # 需先记住地址
```

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

## stash - 临时存储区

暂时提取分支上所有的改动并存储，让开发人员得到一个干净的工作副本，临时转向其他工作。

**默认情况**

- 添加到暂存区的修改（staged changes）
- Git跟踪的但并未添加到暂存区的修改（unstaged changes）
不会缓存
- 在工作目录中新的文件（untracked files）
- 被忽略的文件（ignored files）

> 使用-u或者--include-untracked可以stash untracked文件
> 使用-a或者--all命令可以stash当前目录下的所有修改

```shell
# 暂存区文件添加至临时存储区
git stash
# 添加描述
git stash save <note>
# 临时存储区列表
git stash list
# 查看临时存储区文件区别
git stash show
git stash show --patch # 简写 -p，更详细信息
```

```shell
# 恢复临时存储区（自动删除）
git stash pop
# 恢复临时存储区（不会删除）
git stash apply
# 删除临时存储区
git stash drop
# 清空临时存储区
git stash clear
```

恢复临时存储区新旧写法（删除写法类似）

- ~~`git stash apply stash@{0}`~~
-  `git stash apply n`

- 清空stash：`git stash clear`

> **恢复的时候注意当前分支是否为当初保存的分支**

## config - 配置

```shell
# 配置全局姓名和邮箱
git config --global user.name <user_name>
git config --global user.email <user_email>

# 配置局部姓名和邮箱
git config user.name <user_name>
git config user.email <user_email>

# 为命令取别名
git config alias.a add

# 查看配置
git config --list

```

配置文件

```shell
# 全局配置文件
cd # 进入家目录
subl .gitconfig
# 或者
subl ~/.gitconfig

# 局部配置文件
subl .git/config
```

系统配置

修改 `~/.bashrc` 或 `~/.bash_profile`文件都可，实测修改 `~/.bash_profile`

```shell
alias gs="git status"
alias gc="git commit -m "
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit  "
alias gb="git branch"
alias ga="git add ."
alias go="git checkout"
```

`.gitignore`：不需要被git管理的文件名字添加到此文件中，在执行git命令的时候，git就会忽略这些文件

```shell
*.txt
!a.txt
/vendor/**/*.txt
```

## commit - 提交

```shell
# 向仓库中提交代码
git commit -m 提交信息  
git commit -m 添加readme

# 合并 add + commit
git commit -a -m 提交信息

# 修改提交信息 && 合并提交
git commit --amend
```



## remote - 远端操作

`git remote`

```shell
# 查看远程仓库别名
git remote -v
# 移除远端地址
git remote remove <alias_name> # 简写 rm
# 添加远端地址
git remote add <alias_name> <remote_url>
# 修改远端地址
git remote set-url origin <remote_url> 
```

## fetch - 拉取远端分支

`git fetch`

- 远程下载本地缺失
- 更新远程分支指针
- **不会更改本地仓库状态**，`pull`拉取下来后会**自动和本地分支合并**

| 命令                           | 作用                                 |
| ------------------------------ | ------------------------------------ |
| `git fetch origin master:temp` | 拉取远端分支`master`并新建分支`temp` |

## merge - 合并分支

`git merge`：合并两个分支时会产生一个特殊的提交记录，它有两个父节点

## pull - 拉取远端分支（自动合并）

`git pull`

`fetch` 和 `merge`的合并写法，`fetch`更新远程状态，`merge`最新状态和本地合并。

```shell
# fetch  + merge
git fecth origin ask:temp # 拉取远端mask到本地temp分支
git diff temp # 查看ask 和 temp 差别
git merge temp # 将temp合并到ask
git branch -d temp # 删除temp分支
# pull
git pull origin ask:ask # 将远程ask请求到本地ask
```

## tag - 标签和版本管理

标签是版本库快照。通过标签，无需使用 `commit_id` 来获取固定版本代码

### 标签基本操作

| 命令                                   | 作用                         |
| -------------------------------------- | ---------------------------- |
| `git tag`                              | 查看所有标签                 |
| `git tag <tagname>`                    | 创建标签                     |
| `git tag -a <tagname> -m <comment>`    | 为标签 增加说明              |
| `git show <tagname>`                   | 查看标签内容                 |
| `git tag -d <tagname>`                 | 删除标签                     |
| `git push origin :refs/tags/<tagname>` | 删除远程标签                 |
| `git tag -l |xargs git tag -d`         | 删除本地所有标签（==慎用==） |

### 标签推送和拉取

| 命令                                 | 作用         |
| ------------------------------------ | ------------ |
| `git push origin --tags`             | 推送所有标签 |
| `git push origin <tagname>`          | 推送指定标签 |
| `git clone --branch [tag] [git_url]` | 拉取指定分支 |
| `git clone -b [tag] [git_url]`       |              |

## log - 版本历史

`git log`

```shell
# 查看历史记录
git log
# 简洁历史记录
git log --oneline
# 倒序查看
git log --reverse
# 对比查看
git log -p 
# 最近num次提交
git log -<num>
# 文件变化
git log --name-only
# 文件状态（A | M）
git log --name-status
```

## other - 杂项命令

### rm - 清除缓存区

```shell
# 删除文件 当前分支
git rm -r <fileName>
# 从版本库移除，本地存在（也可用于移除暂存区）
git rm --cached <fileName>
# 从版本库移除，本地也移除
git rm <fileName>
```

```shell
# 移出缓存区 - 适用于（未commit）
git restore --staged <file>
# 还原文件
git restore <file>
```

### mv - 修改文件名

```shell
git mv index.js Index.js
```

> git 文件名大小写不敏感，如果直接修改文件名，则无法追踪变化。

另一种方法：手动改为 `index.js =>  demo.js`，然后 `commit`，再 `demo.js => Index.js` 

### archive - 打包操作

```shell
# 生成zip
git archive master --prefix='confict/' --format=zip > confict.zip
```

## 系统别名



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

## 拉取仓库

### git clone

 ```shell
 # 克隆远端数据仓库到本地
 git clone 仓库地址
 # 远端代码
 git clone -b 分支 仓库地址 本地路径
 # 拉取单分支
 git clone -b master --single-branch https://github.com/ant-design/ant-design.git ant-design
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

1. 生成秘钥：`ssh-keygen`

2. 密钥存储目录：`C:\Users\用户\\.ssh`

   - 公钥名称：`id_rsa.pub`

   - 私钥名称：`id_rsa`

3. 将公钥添加至 ssh key
4. 通过 ssh地址 克隆仓库

> 通过添加 ssh key，可以让设备直接下载 项目

##  ? git 自动化部署

https://docs.github.com/en/developers/webhooks-and-events/webhooks

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

## 无法监测文件名大小写

`git mv`

```
git mv Hello.js hello.js
```

`git commit`

- Hello.js：随意改名
- 提交
- 然后改回 hello.js

> 需要通过commit 后，再操作才能监听

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



# 快捷键

| 快捷键    | 说明                   |
| --------- | ---------------------- |
| Ctrl + u  | 清除到开始             |
| Ctrl + a  | 行首                   |
| Ctrl + e  | 行尾                   |
| Ctrl + w  | 删除左边字符（单词）   |
| Ctrl + xx | 行首，行尾切换         |
| Ctrl + r  | 搜索命令               |
| Ctrl + g  | 取消搜索，并恢复原始行 |
| ctrl + j  | 选中搜索               |



