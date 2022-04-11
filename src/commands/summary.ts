import { Component, Statuspage, Summary } from 'statuspage.js';
import { emojis } from '../utils/emojis.json';

const sp: Statuspage = new Statuspage('kctbh9vrtdwd');

export function summary(): Promise<string> {
    return sp.summary().then(async (summary: Summary) =>
        `**Status:** ${summary.status.description}\n${await resolveComponents(summary.components)}`
    );
}

function resolveComponents(components: Component[] | undefined): Promise<string> {
    if (!components) return Promise.resolve('');

    return Promise.all(components.map(component => {
        if (component.id === '0l2p9nhqnxpd') return ''; // ignore a weird github component
        return getLine(component.status, component.name);
    })).then(res => res.filter(r => r !== '').join('\n'));
}

function getLine(status: string, name: string): string {
    switch (status) {
    case 'operational':
        return `> ${emojis.operational}**${name}:** Operational`;
    case 'degraded_performance':
        return `> ${emojis.degraded_performance} **${name}:** Degraded performance`;
    case 'partial_outage':
        return `> ${emojis.partial_outage} **${name}:** Partial outage`;
    case 'major_outage':
        return `> ${emojis.major_outage} **${name}:** Major outage`;
    default:
        return '';
    }
}
