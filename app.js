//index.js文件
const express = require('express'); // 引入express
const bodyParser = require('body-parser');
const app = express(); // 相当于 http.createServer(app)
const PORT = 3000;
const ADDRESS = '127.0.0.1';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//----- 配置跨域 -----
// express框架解决跨域问题的代码，注意该代码要放在 app.use(router); 之前
app.all("*", (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "POST,GET");
	res.header("Access-Control-Expose-Headers", "x-detail-info")
	res.header("X-Powered-By", "Express");
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});
 
// 访问根路由
app.get('/api', (req, res) => {
	res.send(`Here is server of Carloss's blog. Welcome!`);
});

// 访问文章路由
app.use('/api/essay', require('./src/router/essay_handle'));

// 访问账户路由
app.use('/api/account', require('./src/router/account_handle'));

// 访问评论路由
app.use('/api/comment', require('./src/router/comment_handle'));

// 获取文本路由
app.use('/api/text', require('./src/router/text_handle'));

 
// 监听端口
const server = app.listen(PORT, ADDRESS, () => {
	let host = server.address().address // host域
	let port = server.address().port // 端口号
	
	console.log(`Server running at http://${host}:${port}`)
});