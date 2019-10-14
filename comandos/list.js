const config = require("../config/config.json");
exports.run = (cliente, message, args) => {
  var request = require("request");
  var url = "https://api.mcsrvstat.us/2/"+config.ipsky;
  request({
    url: url,
    json: true,
  }, function(error, response, lite){
    request({
      url: "https://api.mcsrvstat.us/2/"+config.iprank,
      json: true,
    }, function(errorsky, responsesky, sky) {
      request({
        url: "https://api.mcsrvstat.us/2/"+config.ipsky,
        json: true,
      }, function(errorxl, responsexl, xl) {
        var slite;
        var ssky;
        var sxl;

        if (lite.offline) {
          slite = "Servidor apagado.";
        } else {
            if (lite.debug.query == false) {
            slite = "Api no responde.";
            } else {
                if (lite.players.online == "0") {
                    slite = ""
                } else {
                    var jsonfile = lite.players.list;
					var a = '';
					var i = 1;
					var col = 4;
                    slite = jsonfile[0];
					while (jsonfile[i]) {
						slite += ", " + jsonfile[i];
						i++;
					}
                }
            }
        }
        
        
        if (sky.offline) {
          ssky = "Servidor apagado.";
        } else{
            if (sky.debug.query == false) {
                ssky = "Api no responde.";
            } else {
                if (sky.players.online == "0") {
                    ssky = "";
                 } else {
                    var jsonfile = sky.players.list;
					var a = '';
					var i = 1;
					var col = 4;
                    ssky = jsonfile[0];
					while (jsonfile[i]) {
					    ssky += ", " + jsonfile[i];
					    i++;
					}
                }
            }
        }
        
        if (xl.offline) {
          sxl = "Servidor apagado.";
        } else {
            if (xl.debug.query == false) {
          sxl = "Api no responde.";
        } else {
            if (xl.players.online == "0") {
                sxl = "";
            } else {
                var jsonfile = xl.players.list;
				var a = '';
				var i = 1;
				var col = 4;
                sxl = jsonfile[0];
				    while (jsonfile[i]) {
					    sxl += ", " + jsonfile[i];
					    i++;
				    }
                }
            }
        }
        
    message.channel.send({embed: {
      color: 3447003,
      description: '',
      author: {
        name: "Lista de Jugadores Online:"
      },
      fields:[{
        name: '►IberiaLife Skyblock `' + lite.players.online + " / " + lite.players.max + '`',
        value: slite
      },
    {
      name: 'sdsd',
      value: ssky
    },
    {
      name: '►IberiaLife `' + xl.players.online + " / " + xl.players.max + '`',
      value: sxl
    }],
    timestamp: new Date(),
    footer: {
      text: "© 2019 IberiaLife"
    }
    }})
    .catch(console.error);
    });
    });
  });


}
