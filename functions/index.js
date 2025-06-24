const functions = require("firebase-functions");
const twilio = require("twilio");

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const fromNumber = functions.config().twilio.from;
const toNumber = functions.config().twilio.to;

const client = twilio(accountSid, authToken);

exports.notify = functions.https.onRequest(async (req, res) => {
  try {
    const call = await client.calls.create({
      twiml: '<Response><Say>Hello! Please check WhatsApp. Bye!</Say></Response>',
      from: fromNumber,
      to: toNumber,
    });
    res.send(`✅ Call placed! SID: ${call.sid}`);
  } catch (error) {
    res.status(500).send("❌ Error placing call: " + error.message);
  }
});