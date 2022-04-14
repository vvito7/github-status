import { Incident, IncidentUpdates } from 'statuspage.js';
import { APIEmbed, APIEmbedField, APIMessage } from 'discord-api-types/v10';
import { interact } from './interactWithAPI';
import { emojis } from './emojis.json';
import { getData, sendData } from './database';

export async function updateChannels(i: Incident) {
    const guilds = await getData();

    const incidentMessage: APIEmbed = {
        'author': {
            'name': 'GitHub Status',
            'icon_url': 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
            'url': 'https://github.com/vitorlops/github-status'
        },
        'color': getInfo(i.status).color,
        'title': `${i.name}`,
        'url': i.shortlink,
        'fields': getUpdates(i.incident_updates),
        'footer': { 'text': 'Started' },
        'timestamp': new Date(i.created_at).toISOString()
    };

    guilds.forEach(guild => {
        const { channel, role, msg_id } = guild;

        if (i.incident_updates.length === 1) {
            interact<APIMessage>(`channels/${channel}/messages`, 'POST', {
                'content': `<@&${role}>`,
                'embeds': [incidentMessage],
            }).then(message => {
                if (channel === message.channel_id) {
                    sendData('msg_id', message.id, channel);
                }

                return;
            });
        } else {
            interact(`channels/${channel}/messages/${msg_id}`, 'PATCH', {
                'content': `<@&${role}>`,
                'embeds': [incidentMessage],
            });
        }

        if (i.status === 'resolved') {
            sendData('msg_id', null, channel);
        }
    });
}

function getUpdates(iu: IncidentUpdates[]): APIEmbedField[] {
    return iu.reverse().map(i => {
        const { emoji, status } = getInfo(i.status);
        const time = `<t:${Math.floor(new Date(i.created_at).getTime() / 1000)}:t>`;

        return {
            'name': `${emoji} ${status} (${time})`,
            'value': i.body
        };
    });
}

function getInfo(status: string) {
    switch (status) {
    case 'investigating':
        return { color: 15746887, emoji: emojis.major_outage, status: 'Investigating' };
    case 'identified':
        return { color: 16492315, emoji: emojis.partial_outage, status: 'Identified' };
    case 'monitoring':
        return { color: 7634830, emoji: emojis.degraded_performance, status: 'Monitoring' };
    case 'resolved':
        return { color: 3908700, emoji: emojis.operational, status: 'Resolved' };
    default:
        return { color: 3092790, emoji: '', status: '' };
    }
}
