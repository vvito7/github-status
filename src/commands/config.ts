import { APIChatInputApplicationCommandInteractionDataResolved } from 'discord-api-types/v10';
import { sendData } from '../utils/database';
import { emojis } from '../utils/emojis.json';

export function config(resolved: APIChatInputApplicationCommandInteractionDataResolved): string {
    const { channels, roles } = resolved;

    const channelId = Object.keys(channels ?? {})[0];
    const roleId = Object.keys(roles ?? {})[0];
    sendData(['channel', 'role'], [channelId, roleId]);

    return configMessage(channelId, roleId);
}

function configMessage(c: string, r: string) {
    return `${emojis.greenTick} **Announcement channel** and **mention role** has been set to <#${c}> and <@&${r}>`;
}
