const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');

const app = App({
token:process.env.SLACK_BOT_TOKEN,
signingSecrete :process.env.SLACK_SIGNING_SECRET,
port:process.env.PORT || 3000
});
(async() =>{
    //START YOUR APP
    await app.start();
    console.log('bolt app is running')
})();