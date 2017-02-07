﻿var linebot = require('linebot');

var bot = linebot({
    channelId: '1499888713',
    channelSecret: '6d53032b1569c18e7288cc431707aab4',
    channelAccessToken: 'ODMhVyhYF+NU+UsKMrLtzPfwY6eZVFYchFHwh9uzCc15l4OolmgzSqbHFF0fEKvhzURZJVUb915wpDjCH9P9iBlGcT9VP+pUchc4QfsAyPH/YXybobSwaqjFFkk/MI7Acx9QipbMgm8ktYDaAaFJGAdB04t89/1O/w1cDnyilFU='
});

const parser = bodyParser.json({
    verify: function (req, res, buf, encoding) {
        req.rawBody = buf.toString(encoding);
    }
});

function callback(req, res) {
    if (!bot.verify(req.rawBody, req.get('X-Line-Signature'))) {
        return res.sendStatus(400);
    }
    bot.parse(req.body);
    return res.json({});
}
bot.on('message', function (event) {
    console.log("1234");
    console.log(event); //把收到訊息的 event 印出來看看
})

const linebotParser = bot.parser();

function test(req, res, next) {
    res.end("you got mail...");
    return next();
}

module.exports.route = {
    get: {
        '/': [test]
    },
    post: {
        'linewebhook': [parser, callback]
    }
};