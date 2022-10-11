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
        client.messages
        .create({
            body: process.env.MESSAGE,
            from: process.env.FROM,
            to: recipient
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err.message));
        
        return res.status(200).json({message: "Sent successfully"})
    }catch (err){
        return res.status(err.code).send(err.message);
    }

});

module.exports = router;