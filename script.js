const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32509 });
const token = 'YOUR DISCORD BOT TOKEN'; // Replace with your bot token
const guildId = 'YOUR DISCORD SERVER ID'; // Replace with your guild ID

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  unbanAllMembers();
});

async function unbanAllMembers() {
  try {
    const guild = await client.guilds.fetch(guildId);
    const bans = await guild.bans.fetch();

    bans.forEach(async (banEntry) => {
      await guild.members.unban(banEntry.user);
      console.log(`Unbanned user with ID: ${banEntry.user.id}`);
    });

    console.log('Successfully unbanned all members!');
  } catch (error) {
    console.error('Failed to unban members:', error);
  } finally {
    client.destroy();
  }
}

client.login(token);
