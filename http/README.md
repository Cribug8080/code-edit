## 有哪些前端安全问题
1. cross-site scripting XSS 跨站脚本
2. cross-site request forgery csrf 跨站请求伪造
3. 滥用iframe
4. 恶意三方库

### XSS跨站脚本攻击
XSS 可以分为存储型、[反射型](https://cloud.tencent.com/developer/article/1375824)和 DOM 型。
转义
### CSRF
攻击： GET、POST、链接类型
防护：
- 进行同源检测
- 使用 CSRF Token 进行验证
- 对 Cookie 进行双重验证
- 在设置 cookie 属性的时候设置 Samesite ，限制 cookie 不能作为被第三方使用

## 网络劫持
1. DNS劫持
2. HTTP劫持

- 中间人攻击
- 

## 浏览器输入URL按下回车发生了什么
1. 解析URL，分析传输协议和请求的资源地址，如果不合法传给搜索引擎。如果遇到非法字符会转义后再下一步。
2. 缓存判断
3. DNS解析获取ip地址。用户向本地dns服务器请求是递归请求，本地dns向域名服务器属于迭代查询。
4. 获取MAC地址。应用层->传输层（端口号）->网络层（IP地址）->数据链路层（MAC地址）。如何获取mac地址？同一子网使用ARP协议获取mac地址，否则转发给网关
5. [TCP三次握手](https://segmentfault.com/a/1190000039165592)。客户端(SYN,squ(x))->服务端，服务端(SYN,ACK,sqy(y),ack(x+1))->客户端，客户端(ACK,seq(x+1),ack(y+1))->服务端.
6. [HTTPS握手](https://www.jianshu.com/p/e30a8c4fa329) 请求->返回证书公钥->加密随机数->解密密钥，加密内容发送->客户端解密
7. 返回数据，解析html渲染页面
8. 构建DOM树和CSSOM树，如果遇到script标签，判断是否有defer和async属性。构建渲染树，进行布局，最后绘制。
9. TCP四次挥手。客户端CLOSE_WAIT(FIN)->服务端,服务端CLOSE_WAIT(ACK)->客户端,服务端CLOSE_WAIT(FIN)->客户端,客户端(ACK)->服务端,wait 2msl(MSL-Maximum Segment Lifetime)

## 强缓存 & 协商缓存 Cache-Control
请求指令：max-age=<seconds>,max-stale[=<seconds>],min-fresh=<seconds>,no-cache,no-store,no-transform,only-if-cached
响应指令：must-revalidate,no-cache,no-store,no-transform,public,private,proxy-revalidate,max-age=<seconds>,s-maxage=<seconds>


|  指令  |  作用  |
| ---- | ---- |
| public | 表明响应可以被任何对象缓存 
|private|只能被单个用户缓存
|no-cache|强制要求缓存把请求提交给原始服务器进行验证 (协商缓存验证)
|no-store|不使用任何缓存
|max-age=<seconds>|设置缓存存储的最大周期，超过这个时间缓存被认为过期
|s-maxage=<seconds>|覆盖max-age或者Expires头，但是仅适用于共享缓存 (比如各个代理)，私有缓存会忽略它
|max-stale[=<seconds>]|表明客户端愿意接收一个已经过期的资源。可以设置一个可选的秒数，表示响应不能已经过时超过该给定的时间。
|min-fresh=<seconds>|表示客户端希望获取一个能在指定的秒数内保持其最新状态的响应


## http1 http1.1 http2 http3

http1.1
1. 链接持久化，多个http链接共享一个tcp链接。
2. 添加range，可以支持断点续传，206状态码
3. 缓存添加，Etag、If-Unmodified-Since、If-Match、If-None-Match
4. 新增host指定服务器域名
5. 新增head、put、options

http2
1. 二进制协议
2. 多路复用，可以同时发送多个请求和响应
3. 新增数据流为了区分是哪个请求发送的
4. 头信息压缩
5. 服务器推送

http3
HTTP/3基于UDP协议实现了类似于TCP的多路复用数据流、传输可靠性等功能，这套功能被称为QUIC协议。
1. 流量控制、传输可靠性功能
2. 集成TLS加密功能
3. 多路复用：同一物理连接上可以有多个独立的逻辑数据流，实现了数据流的单独传输，解决了TCP的队头阻塞问题
4. 快速握手

## TCP和UDP的区别


功能|UDP|TCP
--|--|--
是否连接|无连接|面向连接
是否可靠|不可靠传输，不使用流量控制和拥塞控制|可靠传输（数据顺序和正确性），使用流量控制和拥塞控制
连接对象个数|支持一对一，一对多，多对一和多对多交互通信|只能是一对一通信
传输方式|面向报文面|向字节流
首部开销|首部开销小，仅8字节|首部最小20字节，最大60字节
适用场景|适用于实时应用，例如视频会议、直播|适用于要求可靠传输的应用，例如文件传输


## 即时通讯的实现


## 浏览器渲染进程
进程是资源分配的最小单位，线程是CPU调度的最小单位。
- 1 个浏览器主进程
- 1 个 GPU 进程
- 1 个网络进程
- 多个渲染进程
- 多个插件进程

### 浏览器的渲染进程的线程总共有五种
（1）GUI渲染线程
（2）JS引擎线程
（3）事件触发线程
（4）定时器触发进程
（5）异步http请求线程

#### GUI渲染线程
解析html文档生成DOM
css代码转换为cssom (css object model)
结合DOM和CSSOM生成渲染树
生成布局（layout）
将布局绘制(paint)在屏幕上

回流必将引起重绘，重绘不一定会引起回流

页面首次渲染
浏览器窗口大小发生改变
元素尺寸或位置发生改变
元素内容变化（文字数量或图片大小等等）
元素字体大小变化
添加或者删除可见的DOM元素
激活CSS伪类（例如：:hover）
查询某些属性或调用某些方法

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。



