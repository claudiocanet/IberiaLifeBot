const config = require("../config/config.json");
exports.run = (cliente, message, args) => {
  var request = require("request");
  var url = "https://servers-live.fivem.net/api/servers/single/"+config.ip;
  request({
    url: url,
    json: true,
  }, function(error, response, body){
        var fivem;
        var players = body.Data.players;
        var pfirst = "**" + players[0].name + "** | id: " + players[0].id + " | ping: " + players[0].ping;
        if (players.length === 0) {
          fivem = "¡No hay jugadores online!";
        } else if (players.length === 1) {
          fivem = pfirst;
        } else {
          var a = '';
					var i = 1;
					var col = 1;
            fivem = pfirst;
					while (players[i]) {
						fivem += "\n**" + players[i].name + "** | id: " + players[i].id + " | ping: " + players[i].ping;
						i++;
					}
        }

    message.channel.send({embed: {
      color: 3447003,
      description: '',
      author: {
        name: "Lista de Jugadores Online:"
      },
      fields:[{
        name: '►IberiaLife FiveM `' + body.Data.players.length + " / " + body.Data.sv_maxclients + '`',
        value: fivem
      }],
    timestamp: new Date(),
    footer: {
      text: "© 2019 IberiaLife - FiveM"
    }
    }})
    .catch(console.error);
  });
}
