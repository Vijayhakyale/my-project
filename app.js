
const SLACK_SIGNING_SECRET='d37e2289d1a386dcc0c4377200737aeb';
const SLACK_BOT_TOKEN='xoxb-2343587270560-3658335849427-pexNm0a47RkkDkBpZCxiVAWn';
const { App} = require('@slack/bolt');

const app = new App({
token:SLACK_BOT_TOKEN,
signingSecrete :SLACK_SIGNING_SECRET,
port:process.env.PORT || 3000
});
(async() =>{
    //START YOUR APP
    await app.start();
    console.log('bolt app is running')
})();

app.message('Good Morning', async ({message,say}) => {
    // Start your app
  
    await say(`Hey <@${message.user}>!  Good Morning` )
    // await app.start(process.env.PORT || 3000);
  
  console.log('<@${message.user}> ',message.user);
  })
app.shortcut('who_am_i',async({
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


});