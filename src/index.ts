import { Client, Guild } from 'discord.js';
import { GatewayIntentBits, APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';
import { Incident, StatuspageUpdates } from 'statuspage.js';
import { handleCommand } from './utils/handleCommand';
import { getWhoInvited, sendInitialMessage } from './utils/sendInitialMessage';
import { updateChannels } from './utils/updateChannels';
import { startDb } from './utils/database';
import { interact } from './utils/interactWithAPI';
import { emojis } from './utils/emojis.json';
import { config } from 'dotenv';
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const spu = new StatuspageUpdates('kctbh9vrtdwd');

client.ws.on('INTERACTION_CREATE', async (interaction: APIChatInputApplicationCommandInteraction) => {
    handleCommand(client, interaction);
});

spu.on('incident_update', async (incident: Incident) => {
    updateChannels(incident);
});

client.on('guildCreate', async (guild: Guild) => {
    const userId = await getWhoInvited(guild);
    sendInitialMessage(userId, guild);

    const owner = await guild.fetchOwner();
    interact(`channels/${process.env.logChannel}/messages`, 'POST', {
        'embeds': [{
            'title': `${guild.name} (${guild.id})`,
            'description': `New guild! ${emojis.mmlol}`,
            'fields': [
                {
                    'name': 'Owner',
                    'value': `${owner.user.username} \`(${owner.id})\``,
                    'inline': true
                },
                {
                    'name': 'Member count',
                    'value': guild.memberCount,
                    'inline': true
                },
                {
                    'name': 'Created at',
                    'value': `<t:${Math.floor(guild.createdTimestamp / 1000)}>`,
                    'inline': true
                }
            ],
            'color': 3092790
        }]
    });
});

startDb();
spu.start();
client.login(process.env.botToken);
