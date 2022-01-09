const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "embed", //the command name for the Slash Command
  description: "Send a embed into the Chat", //the command description for Slash Command Overview
  cooldown: 5,
  memberpermissions: ["MANAGE_SERVER"],
  requiredroles: [],
  alloweduserids: [],
  options: [
		{"String": { name: "title", description: "What should be the Embed title?", required: true }}, //to use in the code: interacton.getString("title")
		{"String": { name: "description", description: "What should be the Embed Description? [ +n+ = NewLine ]", required: true }},
		{"String": { name: "color", description: "What should be the Embed Color?", required: false }},
		{"Channel": { name: "in_where", description: "In What Channel should I send it?", required: false }},
	
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
		const EmbedTitle = options.getString("title"); //same as in StringChoices //RETURNS STRING 
		const EmbedDescription = options.getString("description"); //same as in StringChoices //RETURNS STRING 
		const EmbedColor = options.getString("color"); //same as in StringChoices //RETURNS STRING 
		//let UserOption = options.getUser("OPTIONNAME"); //RETURNS USER OBJECT 
		const ChannelOption = options.getChannel("in_where"); //RETURNS CHANNEL OBJECt
		//let RoleOption = options.getRole("OPTIONNAME"); //RETURNS ROLE OBJECT
		const channel = ChannelOption && ["GUILD_PRIVATE_THREAD ", "GUILD_PUBLIC_THREAD ", "GUILD_NEWS_THREAD ", "GUILD_NEWS", "GUILD_TEXT"].includes(ChannelOption.type) ? ChannelOption : guild.channels.cache.get(channelId);
		let embed = new MessageEmbed().setColor(EmbedColor ? EmbedColor : "BLURPLE")
		.setTitle(String(EmbedTitle).substr(0, 256))
		.setDescription(String(EmbedDescription).substr(0, 2048).split("+n+").join("\n"))
		.setFooter(guild.name, guild.iconURL({dynamic: true}));
		//update it without a response!
		await interaction.reply({content: `Sending the Embed...`, ephemeral: true}); 
		//SEND THE EMBED!
		await channel.send({embeds: [embed]});
		//Edit the reply
		interaction.editReply({content: `✅ Embed sent!`, ephemeral: true}); 
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
