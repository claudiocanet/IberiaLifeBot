const config = require("../config/config.json");
exports.run = (cliente, message, args) => {
  var request = require("request");
  var url = "https://servers-live.fivem.net/api/servers/single/"+config.ip;
  request({
    url: url,
    json: true,
  }, function(error, response, body){
    message.channel.send({embed: {
      color: 3447003,
      description: 'Jugadores online: ' + body.Data.players.length + " / " + body.Data.sv_maxclients
    }})
    .catch(console.error);
  });

  console.log(cliente.guilds);
}
