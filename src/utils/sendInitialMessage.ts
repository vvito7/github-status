import { Guild, Integration } from 'discord.js';
import { APIDMChannel } from 'discord-api-types/v10';
import { interact } from './interactWithAPI';
import { initialMessage } from './replyMessages';
import { config } from 'dotenv';
config();

export function sendInitialMessage(userId: string | null, guild: Guild): void {
    if (!userId) return;

    interact<APIDMChannel>('users/@me/channels', 'POST', {
        'recipient_id': userId,
    }).then(async channel => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        interact<any>(`channels/${channel.id}/messages`, 'POST', {
            'content': initialMessage
        }).then(res => {
            if (res.code === 50007) {
                const channel = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').first();
                interact(`channels/${channel?.id}/messages`, 'POST', {
                    'content': initialMessage
                });
            }
        });
    });
}

export function getWhoInvited(guild: Guild): Promise<string | null> {
    return getIntegration(guild).then(integration =>
        (integration ? integration.user ? integration.user.id : null : null)
    );
}

function getIntegration(guild: Guild): Promise<Integration | undefined> {
    return guild.fetchIntegrations().then(integrations =>
        integrations.find(integration =>
            (integration.application ? integration.application.id === process.env.applicationId : false)
        )
    );
}
