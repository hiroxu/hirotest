var bodyParser = require('body-parser');
const line = require('node-line-bot-api')

line.init({
    accessToken: 'ODMhVyhYF+NU+UsKMrLtzPfwY6eZVFYchFHwh9uzCc15l4OolmgzSqbHFF0fEKvhzURZJVUb915wpDjCH9P9iBlGcT9VP+pUchc4QfsAyPH/YXybobSwaqjFFkk/MI7Acx9QipbMgm8ktYDaAaFJGAdB04t89/1O/w1cDnyilFU=',
    // (Optional) for webhook signature validation
    channelSecret: '6d53032b1569c18e7288cc431707aab4'
})

function callback(req, res, next) {
    const promises = req.body.events.map(event => {
        // reply message
        console.log(event);
        if (event.type === 'message') {
            return line.client.replyMessage({
                replyToken: event.replyToken,
                messages: [
                    {
                        type: 'text',
                        text: event.message.text
                    }
                ]
            })
        }    
    })
    Promise.all(promises).then(() => res.json({ success: true }));

}

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