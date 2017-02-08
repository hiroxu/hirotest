var bodyParser = require('body-parser');
const line = require('node-line-bot-api')
var Storage = require('node-storage');
const store = new Storage('./file');

console.log("channel_secret:%s access_token:%s", process.env.channelSecret, process.env.accessToken); 

line.init({
    accessToken: process.env.accessToken,
    channelSecret: process.env.channelSecret
})

function saveUserProfile(target_uid) {
    line.client.getProfile(target_uid)
        .then((profile) => {
            store.put(target_uid, { user: { id: target_uid, displayname: profile.displayName}});
            //console.log(profile);
            //var data = {
            //    to: userid,
            //    messages: [
            //        {
            //            "type": "text",
            //            "text": ("DisplayName:" + profile.displayName + " StatusMessage:" + profile.statusMessage)
            //        }
            //    ]
            //};
            //return line.client.pushMessage(data).then(() => console.log("send message to user success")).catch(err => console.log(err));
        }).catch(err => console.log(err));
}

function callback(req, res, next) {
    //getUserProfile('U55dfe73ed50291498e30fcb60faeb2e7', 'U55dfe73ed50291498e30fcb60faeb2e7');
    const promises = req.body.events.map(event => {    
        console.log(event);
        var data = store.get(event.source.userId);
        if (data) {
            console.log(data.user.displayname);
        }
        var message = "無法辨識的訊息";
        if (event.type === 'message') {
            if (event.message.type === "text") {
                message = event.message.text;
            }
        } else if (event.type === 'follow') {
            saveUserProfile(event.source.userId);
            message = "歡迎使用肉肉肖幫手";
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