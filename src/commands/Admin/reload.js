const { SlashCommandBuilder, ThreadAutoArchiveDuration, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

// Commands don't need to have their names written here, just set the filename
module.exports = {
	data: new SlashCommandBuilder()
		.setName(basename(__filename))
		.setDescription('Request a Thumbnail.'),
	async execute(interaction) {
		delete require.cache[require.resolve(`./${reload}.js`)];

		try {
			const newCommand = require(`./${reload}.js`);
			interaction.client.commands.set(newreload, newCommand);
			await interaction.reply(`Command \`${newreload}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			await interaction.reply(`There was an error while reloading a command \`${reload}\`:\n\`${error.message}\``);
		}
	},
};