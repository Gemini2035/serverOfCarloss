// 处理博客相关的路由
const { url } = require("inspector");
const { SuccessModel, ErrorModel } = require('../template/model');

const essayHandler = (req, res, handleInfo) => {
    // 定义处理路由的逻辑
    const { httpMethod, methodType } = handleInfo;
    let returnData = {};
    if (httpMethod === 'POST') {
        if(methodType === 'add'){
            returnData = new SuccessModel('这里是新文章添加接口');
        } else if (methodType === 'delete') {
            returnData = new SuccessModel('这里是删除网站文章接口');
        } else if (methodType === 'modify') {
            returnData = new SuccessModel('这里是网站文章修改接口');
        } else {
            returnData = new ErrorModel(`抱歉, 暂不支持${methodType}的POST方法!`);
        }
        res.end(JSON.stringify(returnData));
    } else if (httpMethod === 'GET') {
        res.end(JSON.stringify({
            message: '这是GET测试接口'
        }))
    } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.write(`暂不支持${httpMethod}方法`);
        res.end();
    }
  };
  
  module.exports = essayHandler;
  