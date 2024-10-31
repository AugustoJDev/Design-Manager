const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

// Commands don't need to have their names written here, just set the filename
module.exports = {
	data: new SlashCommandBuilder()
		.setName(basename(__filename))
		.setDescription('Base for commands.'),
	async execute(interaction) {

        let postTags = interaction.channel.appliedTags;
        console.log(postTags)
	},
};