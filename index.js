// index.js
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json()); // important! parses JSON body

// Twilio config
const accountSid = "AC74c8df0c1fa4291cf5bc076e23c06249";
const authToken = "7ec62053be927b93908972d73ab52b3d";
const client = twilio(accountSid, authToken);
const fromNumber = "+18145781370";
const toNumber = "+916385676056";

// Endpoint to receive message from frontend
app.post("/sendMessage", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("No message provided");

  try {
    await client.messages.create({ body: message, from: fromNumber, to: toNumber });
    res.send("Message sent!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log(`Public URL (Replit): ${process.env.REPL_URL}`);
