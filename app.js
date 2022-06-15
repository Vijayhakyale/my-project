
const SLACK_SIGNING_SECRET = 'bf687f6c049a0a4d594a2a15c99efc0b';
const SLACK_BOT_TOKEN = 'xoxb-2343587270560-3658335849427-KP68OhZjq1BbpwjYKpiX6pE0';
const { App } = require('@slack/bolt');
const request = require('request');
const app = new App({
    token:SLACK_BOT_TOKEN,
    signingSecret:SLACK_SIGNING_SECRET,
   port:process.env.PORT || 3000
});
(async () => {
    //START YOUR APP
    await app.start();
    console.log('bolt app is running')
})();

const options = {
    url: 'https://raagvitech127-dev-ed.lightning.force.com/services/data/v48.0/sobjects/Case',
    json: true,
    body: {
        Subject: 'Hello world',
        Description: 'Lorem ipsum dolor sit amet...',
        Origin: 'Web',
        AccountId: '0015g00000HvK07AAF'
    }
};

request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Status: ${res.statusCode}`);
    console.log(body);
});


app.message('Good Morning', async ({ message, say }) => {
    // Start your app

    await say(`Hey <@${message.user}>!  Good Morning`)
     await app.start(process.env.PORT || 3000);

    console.log('<@${message.user}> ', message.user);
})
app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`,{
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "You have a new case request:\n*<https://raagvitech127-dev-ed.lightning.force.com/lightning/o/Case/list?filterName=Recent|00001026 Raagvitech>*"
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Type:*\nComputer (Mobile)"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Case orgin:Phone"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Status:New"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Priority:High"
                    },
                    {
                        "type": "mrkdwn",
                        "text": "*Case Resone:Installation"
                    }
                ]
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Approve"
                        },
                        "style": "primary",
                        "value": "click_me_123"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Deny"
                        },
                        "style": "danger",
                        "value": "click_me_123"
                    }
                ]
            }
        ]
    }
    );
  });
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