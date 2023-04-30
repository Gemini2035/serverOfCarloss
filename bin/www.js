// 创建服务器
const http = require("http");
const serverHandler = require("../app");
const PORT = 8081;

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log("server running at prot 8081");
});
