## 关于 Rn-GitHub

开发这个应用的起初是自己经常逛 github 网站，但是对于 github 页面在国内加载缓慢的问题无法忍受，于是就想做一款自己的 GitHub 客户端，当然有很多人也做过这方面的客户端，但是我想自己做一款，同时把自己学习以及在用的技术巩固下，于是就有了这么款 Rn-GitHub 的客户端，此客户端不采用 Basic 用户名和密码认证，这种认证方式已经过时，并且很不安全，github 也不推荐，此项目采用的是 Github Auth 进行第三方认证，也就是常说的 token 认证方式，这种方式是通过用户到 github 官网专用授权应用的页面登录认证后然后跳转到第三方回调地址传入 CODE 这个临时码，第三方应用通过这个 CODE 可以获取登录用户的 TOKEN 拿到这个 TOKEN 可以做更多事情，比如修改用户基本信息，查询隐私仓库等。此项目没有设计稿，完全依据 rn 原生样式进行开发，如果有设计相关经验人员可以自行修改页面。

## 应用截图

> 安卓：

<img src="https://windke.cn/Public/screenshot/android/1.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/2.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/3.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/4.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/5.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/6.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/7.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/8.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/9.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/10.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/11.png" width="200"/>
<img src="https://windke.cn/Public/screenshot/android/12.png" width="200"/>

> IOS

## 应用下载链接

> 安卓版本
> [https://windke.cn/Public/akps/app-release.apk](https://windke.cn/Public/akps/app-release.apk)
> ![avatar](https://windke.cn/Public/screenshot/android/apk.png)
> IOS 版本
> 目前自用中，暂且只在自己设备上使用，原因就是没有证书不管是个人还是企业的，如果想体验 IOS 版本，请自行下载项目进行编译配置，在自己手机上运行。

## 关于作者

1. 技术博客地址：https://windke.cn/blog/index.html
2. github 地址 : https://github.com/laike
3. 反馈邮箱: 924462390@qq.com

## 用到的技术

这是一个可以用于学习 react-native 的项目，项目采用主要以 redux + react-redux +redux-thunk 为 app 提供状态管理实现主题切换和数据共享实时更新的功能。本地存储用户 token 以及用户基本数据采用 AsyncStorage 技术进行永久性存储，动态和趋势两个页面采用 Realm 数据库进行存储，因为这两个页面的数据已经使用 AsyncStorage 这个技术不能满足了，因为需要查询和排序，为了保证用户得到最新的信息并且最大限度保证用户的体验，设置了四个小时数据库的缓存时间，四个小时内用户打开动态和趋势页面从本地数据库 Realm 中获取，四个小时后自动获取 github 新数据，为啥要这样操作？是因为国内访问 github 很慢，所以需要缓存数据到本地数据库，以提高用户体验。项目中封装了 realm 数据的的查询 插入 修改 以及网页跳转 动态创建网络请求函数等基本操作函数提高了代码复用性，项目中部分使用到了闭包特性，比如 createAsyncSaveFunc 这个函数，封装了 Axios 的请求类添加了 interceptors 请求和响应拦截器，项目中也使用到了单例模式比如请求类 Http 和数据库类 Db 减少应用程序每次都通过实例化类动态创建一个新的实例的额外内存开销，单例都通过 getInstance()这个方法获取单例，项目中还通过 file 协议加载应用下的静态 html 文件，并且通过 WebView 的 js 代码注入功能实现可切换代码查看器多主题的功能，本应用还支持 Scheme 协议，在网页中（安卓里面可以用 windke://windke 打开此 app，ios 里面通过浏览器 windke://也可以打开页面，此方案是为以后如果想通过 Hybrid 混合应用开发提供基本 scheme 协议支持) ，应用集成了 code-push 热更新功能，通过配置可以实现 IOS 和 Android 端的代码热更新，关于 IOS 热更新问题请详细看 code-push 官网需要审核，Android 端没有什么热更新限制，同时该项目还集成了微软的 appcenter 功能可以实时查看用户访问 APP 的情况（包括设备信息，浏览信息，还可以通过 api 监控用户更多信息）
**以上是项目主要技术部分**

## 用到的第三方框架

@react-native-community/async-storage

react-native-code-push

react-native-gesture-handler

react-native-parallax-scroll-view

react-native-root-toast

react-native-router-flux

react-native-splash-screen

react-native-tab-view

react-native-vector-icons

react-native-webview

lottie-ios

react-native-lottie

## 关于编译相关问题

**安卓下面**
`一般来说 按照 yarn install 然后 npx react-native run-android 一般可以运行，如果出现问题请参考下面解决方法`

**IOS 下面**
`请千万使用pod install 来安装 ，yarn install -> cd ios && pod install && cd .. 然后 npx react-native run-ios 一般也能运行，如果不能请参考下面的解决方案。`

**记录开启 DEBUG 调试模式后会出现以下问题，**
**YellowBox\.js:71 Require cycle: node_modules/realm/lib/browser/util\.js \-\> node_modules/realm/lib/browser/rpc\.js \-\> node_modules/realm/lib/browser/util\.js Require cycles are allowed\, but can result in uninitialized values\. Consider refactoring to remove th**

```
解决方案在这里需要修改 node_modules/realm/这个下面的东西
// 增加以下代码
if (DEV) {
url = 'http://localhost:8083' + url.substring(url.lastIndexOf('/'));
}
//还要修改 Java
response.addHeader("Access-Control-Allow-Origin", "http://localhost:8081");
修改为
response.addHeader("Access-Control-Allow-Origin", "\*");
```

**这里我们要注意下关于 SearchPage 的实现方式**

```
注意两点设置 Drawer 的 key 对应搜索组件的 key SearchPage 对应为 SearchPageDrawer 这样的话调用 Actions.SearchPage()才会有用 #关于 realm 编译的问题
```

### 因为国内环境无法下载相关的编译包所以需要修改

```
node_modules/realm/scripts/download-realm.js 下面的地址改为 http-server 的本地地址，http://127.0.0.1:8080/ 然后再在项目目录下 cd ios && pod install && cd .. (注意这个是 ios 版本的时候 android 需要另外弄，)
```

**关于 Pod 安装 以及找不到的问题需要到 PodFile 里面加上这么一句：**

```
source 'https://mirrors.tuna.tsinghua.edu.cn/git/CocoaPods/Specs.git'
然后在 mac 里面的 pod repo 目录下面先把这个 master 版本下载下来放那里，然后我们再执行 pod install 等相关命令的时候就不会报错了。
```

```
关于 react-native-vector-icons 这个组件目前我的开发环境的 rn 版本好像有点不通用，通过 pod install 会出现莫名其妙的错误 千万不能用 npx react-native link 这个命令，这个已经过时命令 对于目前开发环境的新版本会很不友好。
```

**目前 ios 开发环境中，请一直使用 cd ios && pod install && cd .. 这个命令来关联组件。**

**遇到的问题 Realm 查询出错主要是少写了双引号**
`name = ${title}` 需要写成 `name = "${title}"`<br>
<br>
**遇到了在 Android 下面编译的问题主要原因是 build 目录的缓存问题导致，比如安装了 react-native-blur 插件后启动程序，会直接导致程序崩溃或者自动退出**

```
解决方法就是去 android 目录下面删除 build 目录，然后从新编译，就不会有问题，同样的道理适用于 async-storage 这个插件。
```

**今天也继承了微软的 code-push 据我使用和感觉比国内的友盟这些可靠多了**

```
而且免费，集成也很方便，可以统计用户访问了 app 哪些操作，做了什么。而且支持在线编译。
```

**appcenter 微软的地址**

[https://appcenter.ms](https://appcenter.ms)

**关于如何集成 code-push**

[https://github.com/microsoft/react-native-code-push](https://github.com/microsoft/react-native-code-push)

**简书介入 code-push 教程**

[https://www.jianshu.com/p/6a5e00d22723](https://www.jianshu.com/p/6a5e00d22723)

**在获取 notifications 这个 api 的时候，突然发现一只 401，403 状态码表示用户没有得到授权，最后解决方法是在授权地址中需要加入 scopes 这个参数。**

```
页面基本上都有了，但是有几个问题待解决启动页白屏问题，暂时因为编译问题没有弄。还有就是向 WebView 这个组件插入 js 代码还没有实现，实现了的话很多东西可以做，
```

**使用组件 react-native-splash-screen 的时候遇到问题的，如下解决方案可行**

**启动页报错要设置 canOverrideExistingModule=true**
**SplashScreenModule.java 需要加上这个，否则报错。**

解决如下：
`\node_modules\react-native-splash-screen\android\src\main\java\org\devio\rn\splashscreen\SplashScreenModule.java`<br><br>`@Override public boolean canOverrideExistingModule() { return true; }`

### 使用 codepush 的时候，需要先将 js 打包命令如下

`npx react-native bundle --platform android --entry-file index.js --bundle-output ./bundles/index.android.bundle --dev false`

### 发布到 code push

`code-push release-react 应用名称 版本号 平台 更新信息`

`npx react-native bundle --platform android --entry-file index.js --bundle-output ./bundles/index.android.bundle --assets-dest ./bundles --dev false`

`code-push release iOSRNHybridForAndroid ./bundles/index.android.bundle 1.0.0 --deploymentName Production --description "1.支持文章缓存。" --mandatory true`
`code-push release-react iOSRNHybridForAndroid --targetBinaryVersion "1.0.0" -m --description "Modified the header color"`

### GIT 常用命令

`git add . 添加文件`

`git commit - m ' modifed message ' 提交修改并附注信息`

`git push origin master -u 提交到git`

`git branch 查看分支`

`git checkout beta 切换到beta分支`

`git merge master 合并master 分支`

`git pull origin master 更新最新代码到本地`

### 关于某些安装包安装过慢的问题

1.使用淘宝镜像

2.科学上网

3.下载包到本地可以用迅雷等软件，然后修改 node_modules 包中的下载代码，然后开启本地 http-server ，修改到本地服务器地址。
