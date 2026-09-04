const axios = require("axios");

require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/power-bot-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/power-bot-grovel", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Greetings, human!! grovel beneath my feet, for I am the one and only Power!!` });
});

app.command("/power-bot-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `let me tell you a cool cat fact, human!!\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "sorry... all out of braincells right now. catch me later!!" });
  }
});

app.command("/power-bot-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`wanna know a cool joke?! here goes..\n

${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "i'm too lazy!! no joke today." });
  }
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();