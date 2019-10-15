const config = require("../config/config.json");
exports.run = (cliente, message, args) => {
	function intervalFunc() {
		message.channel.fetchMessages({around: "633779613130293255", limit: 1})
  			.then(messages => {
			  var color = "diff";
				var estado = "+ Online";
				var estadolite = "```"+ color + '\n' + estado + "```";
				var request = require("request");
				var url = "https://servers-live.fivem.net/api/servers/single/" + config.ip;
				request({
					url: url,
          headers: {
            'User-Agent': 'request'
          },
					json: true,
				}, function(error, response, body){

          if (!error && response.statusCode === 200) {

            var s = '';
						var players = body.Data.players;
            var pfirst = "► " + players[0].name + " | id: " + players[0].id + " | ping: " + players[0].ping;

            if (players.length === 0) {
              s = "¡No hay jugadores online!";
            } else if (players.length === 1) {
              s = pfirst;
            } else {
              var i = 1;
  						var col = 2;
                s = pfirst;
                while (players[i]) {
                  if (i%col == 0) {
                    s += '\n' + " ► " + players[i].name + " | id: " + players[i].id + " | ping: " + players[i].ping;
                  }
                  else { s += '\t' + " ► " + players[i].name + " | id: " + players[i].id + " | ping: " + players[i].ping;
                }
  							i++;
  						}
            }
						//messages.first().edit("@here ►►Servidor◄◄ ```" + body.players.online + " / " + body.players.max + "```" +'\n' + "Lista de Jugadores: " + "``` " + s + " ```");
						messages.first().edit(body.Data.hostname +"``` Jugadores Online: " + body.Data.players.length + " / " + body.Data.sv_maxclients + "```" +'\n' + "**Lista de Jugadores:** " + "``` " + s + " ```" + '\n' + "**Estado:**" + estadolite);
          }
      });
    		});
  		}
  		setInterval(intervalFunc, 2000);
}
