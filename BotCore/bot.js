const Discord = require('discord.js');
var http = require('http');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.content != null && msg.member.user.tag != client.user.tag)
    {
        console.log("Message : "+msg.content+" : was receive from : "+msg.member.displayName)
    }
    
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }

  if (msg.content === 'rcat')
  {
   
    try {

        http.get('http://aws.random.cat/meow', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            const embed = new Discord.RichEmbed()
            .setImage(JSON.parse(data).file)
            return msg.channel.send({embed});
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });

        

        
        
    } catch(err) {
        return msg.channel.send(err.stack);
    }

  }
});


client.login('');