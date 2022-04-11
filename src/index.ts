import { Client, Guild } from 'discord.js';
import { GatewayIntentBits, APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';
import { Incident, StatuspageUpdates } from 'statuspage.js';
import { handleCommand } from './utils/handleCommand';
import { getWhoInvited, sendInitialMessage } from './utils/sendInitialMessage';
import { updateChannels } from './utils/updateChannels';
import { botToken } from './config.json';
import { startDb } from './utils/database';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// const spu = new StatuspageUpdates('kctbh9vrtdwd');
const spu = new StatuspageUpdates('xvb96fy2pl9t');

client.ws.on('INTERACTION_CREATE', async (interaction: APIChatInputApplicationCommandInteraction) => {
    handleCommand(client, interaction);
});

spu.on('incident_update', async (incident: Incident) => {
    updateChannels(incident);
});

client.on('guildCreate', async (guild: Guild) => {
    const userId = await getWhoInvited(guild);
    sendInitialMessage(userId, guild);
});

startDb();
spu.start();
client.login(botToken);
