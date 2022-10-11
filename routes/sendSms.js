const express = require('express');
require('dotenv').config();

const router = express.Router();

router.post('/sendsms', async (req,res)=> {

    const {recipient} = req.body;
    console.log('Executing send sms route...')

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);

    try{
        const twilioMessage = await client.messages.create({
            body: process.env.MESSAGE,
            from: process.env.FROM,
            to: recipient
        })
    console.log(`Sent successfully ${twilioMessage.sid}`)
    return res.status(200).json({message: "Sent successfully"})     
    }catch (err){
        console.error(`Error sending sms: ${err}`);
        res.status(500).json({message: err.message}).send(); 
    }

});

module.exports = router;