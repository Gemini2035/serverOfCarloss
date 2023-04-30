// 业务类型
const essayHandler = require('../apis/essay_api');

const BUSINESSTYPE = [
    { name: '/api/websiteConfig/', handler: null },
    { name: '/api/essay/', handler: essayHandler}
  ];

// 返回的状态码
const RETURNCODE = [-1, 1]; // 发生错误, 成功

module.exports = {
    BUSINESSTYPE,
    RETURNCODE
}