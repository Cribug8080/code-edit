const querystring = require('querystring');
const http = require('http');
const fs = require('fs')


const server = http.createServer();
server.on('request', (req, res) => {
  const url = req.url;
  if(url ==='/'){
    //response.writeHead(响应状态码，响应头对象): 发送一个响应头给请求。
    res.writeHead(200,{'Content-Type':'text/html'})
    // 如果url=‘/’ ,读取指定文件下的html文件，渲染到页面。
    fs.readFile(__dirname + '/index.html','utf-8',function(err,data){
      if(err){
        throw err ;
      }
      res.end(data);
    });
  }

  if(url.startsWith('/getName')) {
    const queryParams = querystring.parse(url.split('?')[1]);
    var fn = queryParams.callback;
    res.writeHead(200, {
      'Content-Type': 'text/javascript'
    });
    res.write(`${fn}(${JSON.stringify({name: 'kkk'})})`)
    res.end();
  }
})

server.listen(3030);
console.log('server is listen 3030');