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
app.shortcut('Who_am_i',async({
    shortcut,ack,client
}) =>{
    try{
        //Acknowledge shrtcut request
await ack();
const result = await client.views.open({
 trigger_id:shortcut.trigger_id,
 view:{
     type:"modal",
   title:{
       type:"plain_text",
       text:"My app",
   },
   close:{
    type:"plain_text",
    text:"close",
},
blocks:[{
    type:"section",
    text:{
        type:"mrkdwn",
        text:"Hello!", 
    }
}]
 }   
})
console.log(result)
    }

catch(error)
{
console.log(error)
}


})