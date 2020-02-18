add it

1.记录开启 DEBUG 调试模式后会出现以下问题，
YellowBox.js:71 Require cycle: node_modules/realm/lib/browser/util.js -> node_modules/realm/lib/browser/rpc.js -> node_modules/realm/lib/browser/util.js Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove th
解决方案在这里需要修改 node_modules/realm/这个下面的东西
// 增加以下代码
if (**DEV**) {
url = 'http://localhost:8083' + url.substring(url.lastIndexOf('/'));
}
//还要修改 Java

response.addHeader("Access-Control-Allow-Origin", "http://localhost:8081");

修改为

response.addHeader("Access-Control-Allow-Origin", "\*");

#这里我们要注意下关于 SearchPage 的实现方式
注意两点设置 Drawer 的 key 对应搜索组件的 key SearchPage 对应为 SearchPageDrawer 这样的话调用 Actions.SearchPage()才会有用 #关于 realm 编译的问题
因为国内环境无法下载相关的编译包所以需要修改 node_modules/realm/scripts/download-realm.js 下面的地址改为 http-server 的本地地址，http://127.0.0.1:8080/ 然后再在项目目录下 cd ios && pod install && cd .. (注意这个是 ios 版本的时候 android 需要另外弄，)

#关于 Pod 安装 以及找不到的问题需要到 PodFile 里面加上这么一句：
source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
然后在 mac 里面的 pod repo 目录下面先把这个 master 版本下载下来放那里，然后我们再执行 pod install 等相关命令的时候就不会报错了。

#关于 react-native-vector-icons 这个组件目前我的开发环境的 rn 版本好像有点不通用，通过 pod install 会出现莫名其妙的错误 千万不能用 npx react-native link 这个命令，这个已经过时命令 对于目前开发环境的新版本会很不友好。

#目前 ios 开发环境中，请一直使用 cd ios && pod install && cd .. 这个命令来关联组件。

#今天遇到的问题 Realm 查询出错主要是少写了双引号
`name = ${title}` 需要写成 `name = "${title}"`
