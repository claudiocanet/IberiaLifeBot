//const server = require("../config/servers.js");
exports.run = (cliente, message, args) => {
    var servidores = args[0].trim().split(",");
    console.log(servidores);
    var serv = {
        fivem: "617058008643665920",
        skyblock: "610202505103540246"
    };
    if (args[0] == "") {
        console.log("no");
    }
    
    if (servidores.length > 5) {
        console.log("no");
    } else {
        for (var i=0; i < servidores.length; i++) {
            if (servidores[i] != ""){
               cliente.channels.get(serv[servidores[i]]).send("hola");
            } 
        }
    }
}