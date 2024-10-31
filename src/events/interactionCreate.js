const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuOptionBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
	name: basename(__filename),
	async execute(interaction) {

		if (interaction.guild.id === "1137269968363323422") {
			await yCompany(interaction)
		} else {
			if (interaction.type == 3 && interaction.customId == "youtubers") {
				await getRequest(interaction)
			}
	
			if (interaction.isButton() && interaction.customId == "complete") {
				await completeRequest(interaction)
			}
	
			if (interaction.isButton() && interaction.customId == "revision") {
				await revision(interaction)
			}
	
			if (interaction.isButton() && interaction.customId == "react") {
				await react(interaction)
			}
	
			if (interaction.isButton() && interaction.customId == "progress") {
				await progress(interaction)
			}
		}
		
		if (!interaction.isChatInputCommand()) return;

	    const command = client.commands.get(interaction.commandName);

	    if (!command) return;

	        try {
		        await command.execute(interaction);
	        } catch (error) {
		        console.error(error);
		        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	        }
	},
};

async function yCompany(interaction) {

	if (interaction.type == 3 && interaction.customId == "youtubers") {
		await getRequestyCompany(interaction)
	}

	if (interaction.isButton() && interaction.customId == "complete") {
		await completeRequest(interaction)
	}

	if (interaction.isButton() && interaction.customId == "revision") {
		await revision(interaction)
	}

	if (interaction.isButton() && interaction.customId == "react") {
		await react(interaction)
	}

	if (interaction.isButton() && interaction.customId == "progress") {
		await progress(interaction)
	}

	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
}

async function revision(interaction) {
	const thread = await interaction.guild.channels.fetch(interaction.channel.id);
	let channelsyt = require("../../channels.json");
	let name = await getTags(interaction);
	let mention = await interaction.message.embeds[0].title.split(":")[1].replace(" ", "")
	let categories = channelsyt[name].categories;

	if(interaction.user.id == "269516908850577409") {
		let msg = interaction.channel.send(`<@${mention}>`)

		setTimeout(() => {
			msg.delete()
		}, 60000)
	} else {
		let msg = interaction.channel.send("<@269516908850577409>")

		setTimeout(() => {
			msg.delete()
		}, 60000)
	}

        let newTitle = thread.name.replace(`⚙`, `🔎`);

        if (thread && thread.isThread()) {
                        // Editar o tópico para alterar o título
            await thread.edit({
                name: newTitle, // Novo título do tópico
            });

			let postTags = interaction.channel.appliedTags
				postTags.push(categories["Revision"])
			let index = postTags.indexOf(categories["WIP"])
				postTags.splice(index, 1)
			interaction.channel.setAppliedTags(postTags)

            interaction.reply({
				content: `Title changed to: ${newTitle}`,
				ephemeral: true
			});

			let sendReq = interaction.guild.channels.cache.get(channelsyt[name].revision);
				sendReq.send(`[<#${thread.id}>] | Thumbnail sent to revision. Date: <#${thread.id}>`)
	}
}

async function progress(interaction) {

	const thread = await interaction.guild.channels.fetch(interaction.channel.id);
	let channelsyt = require("../../channels.json");
	let name = await getTags(interaction);
	let categories = channelsyt[name].categories;

		let newTitle;

		if(thread.appliedTags.includes(categories["Request"])) {
			newTitle = thread.name.replace(`📥`, `⚙`);
		} else if (thread.appliedTags.includes(categories["Revision"])) {
			newTitle = thread.name.replace(`🔎`, `⚙`);
		}

        if (thread && thread.isThread()) {
			let postTags;

			if(thread.appliedTags.includes(categories["Request"])) {
				newTitle = thread.name.replace(`📥`, `⚙`);

					postTags = interaction.channel.appliedTags
					postTags.push(categories["WIP"])
				let index = postTags.indexOf(categories["Request"])
					postTags.splice(index, 1)
			} else if (thread.appliedTags.includes(categories["Revision"])) {
				newTitle = thread.name.replace(`🔎`, `⚙`);

					postTags = interaction.channel.appliedTags
					postTags.push(categories["WIP"])
				let index = postTags.indexOf(categories["Revision"])
					postTags.splice(index, 1)
			}

			
			interaction.channel.setAppliedTags(postTags)

			await thread.edit({
                name: newTitle,
            });

            interaction.reply({
				content: `Title changed to: ${newTitle}`,
				ephemeral: true
			});

			let sendReq = interaction.guild.channels.cache.get(channelsyt[name].WIP);
				sendReq.send(`[<#${thread.id}>] | Thumbnail in progress. Date: <#${thread.id}>`)
	}
}

async function completeRequest(interaction) {
    try {

		const thread = await interaction.guild.channels.fetch(interaction.channel.id);
		let channelsyt = require("../../channels.json");
		let name = await getTags(interaction);
		let tagName = await getTagName(interaction)
		let categories = channelsyt[name].categories;

		let newTitle;

		if(interaction.channel.appliedTags.includes(categories["Revision"])) {
			newTitle = interaction.channel.name.replace(`🔎`, `✅`);
		} else if (interaction.channel.appliedTags.includes(categories["WIP"])) {
			newTitle = interaction.channel.name.replace(`⚙`, `✅`);
		} else if (interaction.channel.appliedTags.includes(categories["Done"])) {
			return;
		}

		let countChannel = interaction.guild.channels.cache.get(channelsyt[name].count);

		const messages = await countChannel.messages.fetch({ limit: 1 });
        
		let lastMessage = messages.first();

		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonth = monthNames[new Date().getMonth()];

		if(!lastMessage) {
			lastMessage = 1
		} else if (!lastMessage.content.includes(`${currentMonth}`)) {
			lastMessage = 1
		} else {
			lastMessage = Number(lastMessage.content.split("**")[1]) + 1
		}

		await countChannel.send({
			content: `[${currentMonth}] Thumbnail nº **${lastMessage}** Finished for the channel **${tagName}**: \`${newTitle}\` | <#${interaction.channel.id}>`,
			ephemeral: true
		});

		let postTags;

			if(thread.appliedTags.includes(categories["WIP"])) {
				newTitle = thread.name.replace(`⚙`, `✅`);

					postTags = interaction.channel.appliedTags
					postTags.push(categories["Done"])
				let index = postTags.indexOf(categories["WIP"])
					postTags.splice(index, 1)
			} else if (thread.appliedTags.includes(categories["Revision"])) {
				newTitle = thread.name.replace(`🔎`, `✅`);

					postTags = interaction.channel.appliedTags
					postTags.push(categories["Done"])
				let index = postTags.indexOf(categories["Revision"])
					postTags.splice(index, 1)
			}

			interaction.channel.setAppliedTags(postTags);

			await thread.edit({
                name: newTitle,
            });

        	await interaction.channel.setAppliedTags(postTags);

	} catch (err) {
		console.log(err)
	}
}

async function getRequest(interaction) {

	let i = 0

	const embed = new EmbedBuilder()
			.setTitle("Request a Thumbnail")
			.setDescription("Choose your channel to request a thumbnail.")
			.setColor("DarkButNotBlack")

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

		interaction.message.edit({
			embeds: [embed],
			components: [row]
		})

	let channelsyt = require("../../channels.json");
	let role = channelsyt[interaction.values[0]].role;
	let tag = channelsyt[interaction.values[0]].tag;
	let canal = channelsyt[interaction.values[0]].forum;
	let request = channelsyt[interaction.values[0]].categories["Request"];

	const modal = new ModalBuilder()
			.setCustomId('requestModal')
			.setTitle('Request a Thumbnail');

		const thumbTitle = new TextInputBuilder()
			.setCustomId('thumbtitle')
			.setLabel("Thumbnail Title")
			.setStyle(TextInputStyle.Short);
			
		const thumbDate = new TextInputBuilder()
			.setCustomId('thumbdate')
			.setLabel("Deadline")
			.setStyle(TextInputStyle.Short);

		const howThumb = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("After that you put links and references here")
			.setStyle(TextInputStyle.Paragraph);

		const firstActionRow = new ActionRowBuilder().addComponents(thumbTitle);
		const thirdActionRow = new ActionRowBuilder().addComponents(thumbDate);

		modal.addComponents(firstActionRow, thirdActionRow);

		await interaction.showModal(modal);

		console.log(i)
		i++

		const filter = (response) => {
			return response.user.id == interaction.user.id;
		}
			
		interaction.awaitModalSubmit({ time: 60_000, filter })
			.then(async int => {

				let fields = int.fields.fields.map(fields => fields.value);

				const complete = new ButtonBuilder()
					.setCustomId('complete')
					.setLabel('Complete')
					.setEmoji('✅')
					.setStyle(ButtonStyle.Success);

				const revision = new ButtonBuilder()
					.setCustomId('revision')
					.setLabel('Revision')
					.setEmoji('🔎')
					.setStyle(ButtonStyle.Primary);

				const progress = new ButtonBuilder()
					.setCustomId('progress')
					.setLabel('Progress')
					.setEmoji('⚙')
					.setStyle(ButtonStyle.Secondary);

            	const row = new ActionRowBuilder()
			    	.addComponents(progress, revision, complete);

				let postDescription = new EmbedBuilder()
					.setTitle(`Requested by ${interaction.user.username} : ${interaction.user.id}`)
					.setDescription(`After that you put links and references here`)

				const channel = interaction.guild.channels.cache.get(canal);
				const thread = await channel.threads.create({ name: `📥 ${fields[1]} | ${fields[0]}`, message: { embeds: [postDescription], components: [row] } })

				let postTags = thread.appliedTags
        		postTags.push(request, tag)
        		thread.setAppliedTags(postTags)

				int.reply({
					content: `----- Thank you for your submission! ----- \nClick here to open the requested channel: \n<#${thread.id}>`,
					ephemeral: true
				})

				let sendReq = int.guild.channels.cache.get(channelsyt[interaction.values[0]].request);
				console.log(`${interaction.values[0]} ::: ${channelsyt[interaction.values[0]].request}`)
				console.log(sendReq)
				sendReq.send(`[<#${thread.id}>] | Thumbnail sent to request. Date: \`${thread.name.split("|")[0].replace("📥", "")}\` / Thread Name: \`${thread.name}\``)
			})
			.catch(err => console.log(err));
};

async function getRequestyCompany(interaction) {

	let i = 0

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

		interaction.message.edit({
			embeds: [embed],
			components: [row]
		})

	let channelsyt = require("../../channels.json");
	let role = channelsyt[interaction.values[0]].role;
	let tag = channelsyt[interaction.values[0]].tag;
	let canal = channelsyt[interaction.values[0]].forum;
	let request = channelsyt[interaction.values[0]].categories["Request"];

	const modal = new ModalBuilder()
			.setCustomId('requestModal')
			.setTitle('Request a Thumbnail');

		const thumbTitle = new TextInputBuilder()
			.setCustomId('thumbtitle')
			.setLabel("Thumbnail Title")
			.setStyle(TextInputStyle.Short);
			
		const thumbDate = new TextInputBuilder()
			.setCustomId('thumbdate')
			.setLabel("Deadline")
			.setStyle(TextInputStyle.Short);

		const howThumb = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("After that you put links and references here")
			.setStyle(TextInputStyle.Paragraph);

		const firstActionRow = new ActionRowBuilder().addComponents(thumbTitle);
		const thirdActionRow = new ActionRowBuilder().addComponents(thumbDate);

		modal.addComponents(firstActionRow, thirdActionRow);

		await interaction.showModal(modal);

		console.log(i)
		i++

		const filter = (response) => {
			return response.user.id == interaction.user.id;
		}
			
		interaction.awaitModalSubmit({ time: 60_000, filter })
			.then(async int => {

				let fields = int.fields.fields.map(fields => fields.value);

				const complete = new ButtonBuilder()
					.setCustomId('complete')
					.setLabel('Complete')
					.setEmoji('✅')
					.setStyle(ButtonStyle.Success);

				const revision = new ButtonBuilder()
					.setCustomId('revision')
					.setLabel('Revision')
					.setEmoji('🔎')
					.setStyle(ButtonStyle.Primary);

				const progress = new ButtonBuilder()
					.setCustomId('progress')
					.setLabel('Progress')
					.setEmoji('⚙')
					.setStyle(ButtonStyle.Secondary);

            	const row = new ActionRowBuilder()
			    	.addComponents(progress, revision, complete);

				let postDescription = new EmbedBuilder()
					.setTitle(`Requested by ${interaction.user.username} : ${interaction.user.id}`)
					.setDescription(`After that you put links and references here`)

				const channel = interaction.guild.channels.cache.get(canal);
				const thread = await channel.threads.create({ name: `📥 ${fields[1]} | ${fields[0]}`, message: { embeds: [postDescription], components: [row] } })

				let postTags = thread.appliedTags
        		postTags.push(request, tag)
        		thread.setAppliedTags(postTags)

				int.reply({
					content: `----- Thank you for your submission! ----- \nClick here to open the requested channel: \n<#${thread.id}>`,
					ephemeral: true
				})

				let sendReq = int.guild.channels.cache.get(channelsyt[interaction.values[0]].request);
				console.log(`${interaction.values[0]} ::: ${channelsyt[interaction.values[0]].request}`)
				sendReq.send(`[<#${thread.id}>] | Thumbnail sent to request. Date: \`${thread.name.split("|")[0].replace("📥", "")}\` / Thread Name: \`${thread.name}\``)
			})
			.catch(err => console.log(err));
};

async function getTags(interaction) {
	let postTags = interaction.channel.appliedTags;
	
	let tags = [
		"1259542836999884841-sirud",
		"1259542879651631266-sirudr",
		"1259551106217021510-beckp",
		"1259551119135477831-beck",
		"1277608942238699531-beckb",
		"1277609204546273290-morebb",
		"1277608867777347616-beckbr",
		"1297333462352662599-lueverson"
	]

	for(let i = 0; i < tags.length; i++) {
		if(postTags.includes(tags[i].split("-")[0])) {
			return tags[i].split("-")[1];
		} else {
			continue;
		}
	}
}

async function getTagName(interaction) {
	let postTags = interaction.channel.appliedTags;
	
	let tags = [
		"1259542836999884841-Sirud",
		"1259542879651631266-Sirud Reacts",
		"1259551106217021510-BeckBroPlays",
		"1259551119135477831-BeckBroJack",
		"1277608942238699531-BeckBros",
		"1277609204546273290-MoreBeckBros",
		"1277608867777347616-BeckBro Reacts",
		"1297333462352662599-Lueverson"
	]

	for(let i = 0; i < tags.length; i++) {
		if(postTags.includes(tags[i].split("-")[0])) {
			return tags[i].split("-")[1];
		} else {
			continue;
		}
	}
}