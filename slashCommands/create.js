const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "create", //the command name for the Slash Command
  description: "Start an #event", //the command description for Slash Command Overview
  cooldown: 5,
  memberpermissions: ["MANAGE_SERVER"],
  requiredroles: ["919287160543273070", "919287162321645588", "919287163001143368","919287471085322271", "920364252173332520"],
  alloweduserids: [],
  options: [
		{"String": { name: "Department", description: "Department field", required: true }},
		{"String": { name: "Description", description: "Description field", required: true }},
		{"String": { name: "Requirements", description: "Separate requirements with a comma (,)", required: true }},
    {"String": { name: "Starts", description: "When will the event start?", required: true }},
    {"String": { name: "Training Server Code", description: "The code for the Training Server", required: true }},
	
  ],
  run: async (client, interaction) => {
    try{
	    //console.log(interaction, StringOption)
		
		//things u can directly access in an interaction!
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;
		//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER 
		const EmbedTitle = options.getString("Department"); //same as in StringChoices //RETURNS STRING 
		const EmbedDescription = options.getString("Description"); //same as in StringChoices //RETURNS STRING
    const Requirements = options.getString("Requirements");
    const StartTime = options.getString("Starts");
    const ServerCode = options.getString("Training Server Code");
		const EmbedColor = "#000000";
		const channel = guild.channels.cache.get(919283293038469180);
		let embed = new MessageEmbed().setColor(EmbedColor ? EmbedColor : "BLURPLE")
		.setTitle(String(EmbedTitle).substr(0, 256))
		.setDescription(String(EmbedDescription).substr(0, 2048).split("+n+").join("\n"))
    .addField('Requirements', String(Requirements).substr(0, 1024), false)
    .addField('Starts', String(StartTime).substr(0, 1024), false)
    .addField('Server Code', String(ServerCode).substr(0, 1024), false)
		.setFooter(guild.name, guild.iconURL({dynamic: true}));
		await interaction.reply({content: `Sending...`, ephemeral: true}); 
		await channel.send({embeds: [embed]});
		interaction.editReply({content: `Event sent!`, ephemeral: true}); 
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}
