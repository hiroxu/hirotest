var linebot = require('linebot');
var bot = linebot({
    channelId: '1499888713',
    channelSecret: '6d53032b1569c18e7288cc431707aab4',
    channelAccessToken: 'ODMhVyhYF+NU+UsKMrLtzPfwY6eZVFYchFHwh9uzCc15l4OolmgzSqbHFF0fEKvhzURZJVUb915wpDjCH9P9iBlGcT9VP+pUchc4QfsAyPH/YXybobSwaqjFFkk/MI7Acx9QipbMgm8ktYDaAaFJGAdB04t89/1O/w1cDnyilFU='
});

bot.on('message', function (event) {
    console.log(event); //把收到訊息的 event 印出來看看
})
const linebotParser = bot.parser();

module.exports.route = {
    get: {
    },
    post: {
        'linewebhook': [linebotParser]
    }
};