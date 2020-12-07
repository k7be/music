require("dotenv").config();//Loading .env
const fs = require("fs");
const { Collection, Client } = require("discord.js");

const client = new Client({
   disableEveryone: true
})
client.commands = new Collection();//Making client.commands as a Discord.js Collection
client.queue = new Map()

const keepAlive = require("./server.js")
const { token, prefix } = require("./config.js")


client.config = {
  prefix: process.env.PREFIX
}

//Loading Events
fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
    console.log("Loading Event: "+eventName)
  });
});

//Loading Commands
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, props);
    console.log("Loading Command: "+commandName)
  });
});

client.on("ready", () => {
  console.log("Bot was logged in!")
})

keepAlive()
//Logging in to discord
client.login("Nzg0OTI0NzkyNDI4MDM2MDk2.X8wYLQ.tnO4IUX-d6OJMuwfmxYAFOvejBs")
