const request = require('superagent');
const cheerio = require('cheerio');


const siteSpider = () => {
    const targetUrl = 'https://github.com/Gemini2035/MyBlog_vue';
    return new Promise((resolve, reject) => {
        request.get(encodeURI(targetUrl)).timeout({response: 10000, deadline: 60000})
        .then(res => {
            const CheerioObject = cheerio.load(res.text);
            const originContent = CheerioObject('#repo-content-pjax-container > div > div > div.Layout.Layout--flowRow-until-md.Layout--sidebarPosition-end.Layout--sidebarPosition-flowRow-end > div.Layout-sidebar > div > div:nth-child(5) > div').text();
            try {
                const targetContent = originContent.replace(/\s*/g,'').replace(/\n/g, '').split('Languages')[1];
                const regex = /[\d.%]+/g;
                const langList = targetContent.split(regex);
                const personageList = targetContent.match(regex);
                const result = []
                personageList.forEach((personage, index) => {
                    result.push({
                        name: langList[index],
                        personage: personage
                    });
                });
                return resolve(result); 
            } catch {
                throw Error('处理数据时发生错误!');
            }
        })
        .catch((error) => {
            if (error.code) return reject(error.code);
            else return reject(error);
        }
    )
})
}

module.exports = {
    siteSpider
}