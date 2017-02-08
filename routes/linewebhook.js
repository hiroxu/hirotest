var bodyParser = require('body-parser');
const line = require('node-line-bot-api')

line.init({
    accessToken: 'ODMhVyhYF+NU+UsKMrLtzPfwY6eZVFYchFHwh9uzCc15l4OolmgzSqbHFF0fEKvhzURZJVUb915wpDjCH9P9iBlGcT9VP+pUchc4QfsAyPH/YXybobSwaqjFFkk/MI7Acx9QipbMgm8ktYDaAaFJGAdB04t89/1O/w1cDnyilFU=',
    channelSecret: '6d53032b1569c18e7288cc431707aab4'
})

function getUserProfile(userid,target_uid) {
    line.client.getProfile(target_uid)
        .then((profile) => {
            console.log(profile);
            var data = {
                to: userid,
                messages: [
                    {
                        "type": "text",
                        "text": ("DisplayName:" + profile.displayName + " StatusMessage:" + profile.statusMessage)
                    }
                ]
            };
            line.client.pushMessage(data).then(() => console.log("send message to user success")).catch(err => console.log(err));
        }).catch(err => console.log(err));
}
function callback(req, res, next) {
    getUserProfile('U55dfe73ed50291498e30fcb60faeb2e7', 'U55dfe73ed50291498e30fcb60faeb2e7');
    const promises = req.body.events.map(event => {    
        console.log(event);
        var message = "無法辨識的訊息";
        if (event.type === 'message') {
            if (event.message.type === "text") {
                message = event.message.text;
            }
        }
        return line.client.replyMessage({
            replyToken: event.replyToken,
            messages: [
                {
                    type: 'text',
                    text: message
                }
            ]
        });           
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