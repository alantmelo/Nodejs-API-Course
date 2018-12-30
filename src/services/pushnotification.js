const OneSignal = require('onesignal-node');
const config = require('../config');

exports.sendNotification = (data) => {

    let myClient = new OneSignal.Client({
        userAuthKey: 'ahoradamissa',
        app: {
            appAuthKey: config.appAuthKey,
            appId: config.appId
        }
    });

    let firstNotification = new OneSignal.Notification({
        contents: {
            en: `Welcome ${data.name}`,
        },
        included_segments: ["Active Users", "Inactive Users"]
    });

    myClient.sendNotification(firstNotification, (err, httpResponse, data) => {
        if (err) {
            console.log('Something went wrong...');
        } else {
            console.log(data, httpResponse.statusCode);
        };
    });

}