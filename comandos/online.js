const config = require("../config/config.json");
exports.run = (cliente, message, args) => {
  var request = require("request");
  var url = "https://api.mcsrvstat.us/2/"+config.ip;
  request({
    url: url,
    json: true,
  }, function(error, response, body){
    message.channel.send({embed: {
      color: 3447003,
      description: 'Jugadores online: ' + body.players.online + " / " + body.players.max
    }})
    .catch(console.error);
  });
  
  console.log(cliente.guilds);
}