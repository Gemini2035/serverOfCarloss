const url = require('url');

const { BUSINESSTYPE } = require('./src/template/basic');

const serverHandler = (req, res) => {
  // 设置相应格式
  res.setHeader("Content-Type", "application/json");

  //  获取path
  const reqUrl = req.url;
  req.path = reqUrl.split("?")[0];
  //   解析query
  req.query = url.parse(reqUrl, true).query;
  // 判断业务逻辑
  for (let i = 0; i < BUSINESSTYPE.length; i++) {
    if (reqUrl.indexOf(BUSINESSTYPE[i].name) !== -1) {
      mt = reqUrl.split(BUSINESSTYPE[i].name)[1];
      BUSINESSTYPE[i].handler(req, res, {httpMethod: req.method, methodType: mt});
      break;
    }
  }

  // res.end(JSON.stringify(responseData));
};

module.exports = serverHandler;

