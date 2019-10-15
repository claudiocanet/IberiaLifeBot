//Iniciar discord y import de archivos, variables
const Discord = require('discord.js');
const cliente = new Discord.Client();
const config = require("./config/config.json");
const prefix = config.prefix;
var colors = require('colors');

//Paquetes
const fs = require("fs");

//conectar a base de datos
const mysql = require('mysql');
const db = require("./config/database.json");

//Conexion con base de datos
/*const conexion = mysql.createConnection({
	host: db.host,
	user: db.user,
	password: db.password,
	database: db.database
});*/

//verificar base
/*conexion.connect((err) => {
	if (err) throw err;
	console.log(colors.green('►[DataBase]=>'),	'!Base de datos conectada!');
});*/

//Verificar cliente
cliente.on('ready', () => {
	console.log(colors.green('►[BOT]=>'),  '¡Bot cargado con exito!');
  console.log(colors.green('►[BOT]=>'), `Logueado como: ${cliente.user.tag}!`);
});


fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];

		cliente.on(eventName, (...args) => eventFunction.run(cliente, ...args));
	});
});

//<Codigo ejecutable>
cliente.on('message', (message) => {
//evitar comandos sin prefix
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

//Definir comando
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const comando = args.shift().toLowerCase();


//Ejecutar comandos
	try {
		let commandFile = require(`./comandos/${comando}.js`);
		commandFile.run(cliente, message, args);
		console.log(colors.green('►[Comando]=>'), colors.bold('('+comando+')') , ' ►Comando ejecutado con exito por:', colors.yellow(message.author.username));
	}
	catch (err) {
		console.log(colors.red('►[Comando]=>'), colors.bold('('+comando+')') , ' ►Comando no existe. Ejecutado por:', colors.yellow(message.author.username));
		message.channel.send({embed: {
		color: 0xfb5e62,
		description: "El comando **" + comando + "** no existe"
	}})

	}
});
//</Codigo ejecutable


//Conexion con bot
cliente.login(config.token);
