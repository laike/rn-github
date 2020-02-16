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
