# Design Manager
A bot designed to generate and organize customer requests in forums, separating them into categories such as: **Request**, **WIP**, **Revision** and **Done**. The language used in this project was **JavaScript** with **Node.js**, and the libraries: **discord.js**, **colors** and **dontenv**.

![](https://media.discordapp.net/attachments/1227303060804730910/1299837216956223498/image.png?ex=672495fe&is=6723447e&hm=d7242530cd17fec61d02e561f50bebc2a0f8720a73cc14a1565d93ea1e13c10c&=&format=webp&quality=lossless&width=469&height=670) ![](https://cdn.discordapp.com/attachments/1227303060804730910/1282539164406911068/image.png?ex=6724472d&is=6722f5ad&hm=0c767b01e9f47536d560fbfa092679af226fd2103c6a46131f6e606b99693b0c&)

## How the Design Manager came about

This project came about through the need to organize the orders of a friend's clients, so he asked me for a project to organize this on Discord itself, where all his clients placed their orders. I came up with the idea of developing a script to separate the orders into categories in Discord's own forums, but it was quite a challenge, since the documentation for the forums is extremely scarce, since it's new on the platform, and the project worked so well that as well as using it for his customers, he also uses it for his employees, while they are trained with tests as if they were orders from real customers. For the project, I used the JavaScript language with Node.js, and the discord.js library to help me with this.

## Quickstart

### 1. Install Dependencies

Download all dependencies by running the following command in your terminal:

```bash
npm i
```

### 2. Set the Bot Token

Place your bot token in the `.env` file. Make sure to format it as follows:

```plaintext
TOKEN=your_bot_token_here
```

### 3. Update Channel IDs and Other Information

In the file `channels.json`, replace all placeholder IDs and information with the IDs for the channels you want the bot to interact with.

Additionally, open `src/events/interactionCreate.js` and replace the IDs for the user who will interact with the bot. These can be found on **lines 89 and 96**.

### 4. Customize Client Information in Requests

In `src/commands/request.js`, update client-specific information, such as names, roles, and any other relevant details. This will personalize the bot's responses to fit the designated client requirements.

### 5. Start the Bot

To start the bot, run the following command with `main.js`:

```bash
node main.js
```

Now your bot should be up and running with all configurations!

### If this project was useful to you, consider sponsoring me, so I can buy a delicious Starbucks 😋😋

[![Donate](https://i.imgur.com/h6CM9tR.jpg)](https://www.paypal.com/donate/?business=DAPMXVUCLW7QE&no_recurring=0&currency_code=USD)