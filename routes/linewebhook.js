var linebot = require('linebot');
var bodyParser = require('body-parser');
var _ = require('lodash');
var request = require('superagent');
//var LineBot = require('line-bot-sdk');
const line = require('node-line-bot-api')
line.init({
    accessToken: 'ODMhVyhYF+NU+UsKMrLtzPfwY6eZVFYchFHwh9uzCc15l4OolmgzSqbHFF0fEKvhzURZJVUb915wpDjCH9P9iBlGcT9VP+pUchc4QfsAyPH/YXybobSwaqjFFkk/MI7Acx9QipbMgm8ktYDaAaFJGAdB04t89/1O/w1cDnyilFU=',
    // (Optional) for webhook signature validation
    channelSecret: '6d53032b1569c18e7288cc431707aab4'
})

//var client = LineBot.client({
//    channelID: '1499888713',
//    channelSecret: '6d53032b1569c18e7288cc431707aab4',
//    channelToken: 'ODMhVyhYF+NU+UsKMrLtzPfwY6eZVFYchFHwh9uzCc15l4OolmgzSqbHFF0fEKvhzURZJVUb915wpDjCH9P9iBlGcT9VP+pUchc4QfsAyPH/YXybobSwaqjFFkk/MI7Acx9QipbMgm8ktYDaAaFJGAdB04t89/1O/w1cDnyilFU='
//});


//var bot = linebot({
//    channelId: '1499888713',
//    channelSecret: '6d53032b1569c18e7288cc431707aab4',
//    channelAccessToken: 'ODMhVyhYF+NU+UsKMrLtzPfwY6eZVFYchFHwh9uzCc15l4OolmgzSqbHFF0fEKvhzURZJVUb915wpDjCH9P9iBlGcT9VP+pUchc4QfsAyPH/YXybobSwaqjFFkk/MI7Acx9QipbMgm8ktYDaAaFJGAdB04t89/1O/w1cDnyilFU='
//});

//const parser = bodyParser.json({
//    verify: function (req, res, buf, encoding) {
//        console.log("5678");
//        req.rawBody = buf.toString(encoding);
//    }
//});

function callback(req, res, next) {
    //try {
    //    console.log(req.body);

    //    //var receives = client.createReceivesFromJSON(req.body);
    //} catch (error) {
    //    console.log(error.message);
    //}

    const promises = req.body.events.map(event => {
        // reply message
        return line.client
            .replyMessage({
                replyToken: event.replyToken,
                messages: [
                    {
                        type: 'text',
                        text: event.message.text
                    }
                ]
            })
    })
    Promise.all(promises).then(() => res.json({ success: true }));

}
//bot.on('message', function (event) {
//    console.log("1234");
//    console.log(event); //把收到訊息的 event 印出來看看
//})

//const linebotParser = bot.parser();

function test(req, res, next) {
    res.end("you got mail...");
    return next();
}

module.exports.route = {
    get: {
        '/': [test]
    },
    post: {
        'linewebhook': [line.validator.validateSignature(), callback]
    }
};