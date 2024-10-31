const { SlashCommandBuilder, ThreadAutoArchiveDuration, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(basename(__filename))
		.setDescription('Request a Thumbnail.'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setTitle("Request a Thumbnail")
			.setDescription("Choose your channel to request a thumbnail.")
			.setColor("DarkButNotBlack")

			if(interaction.guild.id === "1137269968363323422") {
				const embed = new EmbedBuilder()
					.setTitle("Request a Thumbnail")
					.setDescription("Choose the thumbmaker to request a thumbnail.")
					.setColor("DarkButNotBlack")

				const select = new StringSelectMenuBuilder()
				.setCustomId('youtubers')
				.setPlaceholder('Select the thumbmaker')
				.addOptions(
					new StringSelectMenuOptionBuilder()
						.setLabel('Lueverson')
						.setValue('lueverson')
				);
	
				const row = new ActionRowBuilder()
					.addComponents(select);
		
				interaction.reply({
					embeds: [embed],
					components: [row]
				})
			} else {
				const select = new StringSelectMenuBuilder()
				.setCustomId('youtubers')
				.setPlaceholder('Select your channel')
				.addOptions(
					new StringSelectMenuOptionBuilder()
						.setLabel('Sirud Reacts')
						.setValue('sirudr'),
					new StringSelectMenuOptionBuilder()
						.setLabel('Sirud')
						.setValue('sirud'),
					new StringSelectMenuOptionBuilder()
						.setLabel('BeckBroJack')
						.setValue('beck'),
					new StringSelectMenuOptionBuilder()
						.setLabel('BeckBroPlays')
						.setValue('beckp'),
					new StringSelectMenuOptionBuilder()
						.setLabel('BeckBros')
						.setValue('beckb'),
					new StringSelectMenuOptionBuilder()
						.setLabel('MoreBeckBros')
						.setValue('morebb'),
					new StringSelectMenuOptionBuilder()
						.setLabel('BeckBroReacts')
						.setValue('beckbr')
				);
	
				const row = new ActionRowBuilder()
					.addComponents(select);
		
				interaction.reply({
					embeds: [embed],
					components: [row]
				})
			}	
	},
};