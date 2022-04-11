import { APIChatInputApplicationCommandInteractionDataResolved } from 'discord-api-types/v10';
import { getData, sendData } from '../utils/database';
import { emojis } from '../utils/emojis.json';

export async function config(resolved: APIChatInputApplicationCommandInteractionDataResolved): Promise<string> {
    const { channels, roles } = resolved;

    const channelId = Object.keys(channels ?? {})[0];
    const roleId = Object.keys(roles ?? {})[0];

    const channelsIds: string[] = [];
    await getData().then(data => {
        data.forEach(row => channelsIds.push(row.channel));
    });

    if (channelsIds.includes(channelId)) {
        return `${emojis.redTick} This channel is already an announcement channel.`;
    } else {
        sendData(['channel', 'role'], [channelId, roleId]);
        return configMessage(channelId, roleId);
    }
}

function configMessage(c: string, r: string) {
    return `${emojis.greenTick} **Announcement channel** and **mention role** has been set to <#${c}> and <@&${r}>`;
}
