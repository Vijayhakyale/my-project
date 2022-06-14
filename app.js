
// const SLACK_SIGNING_SECRET = 'bf687f6c049a0a4d594a2a15c99efc0b';
// const SLACK_BOT_TOKEN = 'xoxb-2343587270560-3658335849427-pexNm0a47RkkDkBpZCxiVAWn';
const { App } = require('@slack/bolt');
//const request = require('request');

// const options = {
//     url: 'https://raagvitech127-dev-ed.lightning.force.com/services/data/v48.0/sobjects/Case',
//     json: true,
//     body: {
//         Subject: 'Hello world',
//         Description: 'Lorem ipsum dolor sit amet...',
//         Origin: 'Web',
//         AccountId: '0015g00000HvK07AAF'
//     }
// };

// request.post(options, (err, res, body) => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(`Status: ${res.statusCode}`);
//     console.log(body);
// });
const app = new App({
    token:process.env.SLACK_BOT_TOKEN,
    signingSecret:process.env.SLACK_SIGNING_SECRET,
   port:process.env.PORT || 3000
});
(async () => {
    //START YOUR APP
    await app.start();
    console.log('bolt app is running')
})();

app.message('Good Morning', async ({ message, say }) => {
    // Start your app

    await say(`Hey <@${message.user}>!  Good Morning`)
     await app.start(process.env.PORT || 3000);

    console.log('<@${message.user}> ', message.user);
})
app.shortcut('who_am_i', async ({
    shortcut, ack, client
}) => {
    try {
        //Acknowledge shrtcut request
        await ack();
        const result = await client.views.open({
            trigger_id: shortcut.trigger_id,
            view: {
                type: "modal",
                title: {
                    type: "plain_text",
                    text: "My app",
                },
                close: {
                    type: "plain_text",
                    text: "close",
                },
                blocks: [{
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "Hello!",
                    }
                }]
            }
        })
        console.log(result)
    }

    catch (error) {
        console.log(error)
    }


});