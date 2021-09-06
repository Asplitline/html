# bilibili 手机离线转电脑

软件 ：`bilibili uwp` 

位置：`/Android/data/tv.danmaku.bili`

通过 `aid` 获取 视频名称

环境：`node`

依赖：`node-fetch`

流程：

1.  手机下载 `bilibili`视频
2.  `usb`连接电脑
3. 在`/Android/data/tv.danmaku.bili`下找到 `download`
4. 提取所有目录名称 （除 `s_`开头）
5. 通过 `md a b c` bash命令，批量创建目录
6. 通过`node app` 提取 信息
7. 选择合适视频 导入 `bilibili uwp`

> 详情看 `bilibili`文件夹

