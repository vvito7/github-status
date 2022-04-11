import { Client } from 'discord.js';
import { emojis } from '../utils/emojis.json';

export function about(client: Client) {
    return `
**About** ${emojis.wumpus}
Simple bot that can notify you when a new incident in GitHub happens.
> **Author:** [vito7](<https://github.com/vitorlops>)
> **Repository:** [GitHub](<https://github.com/vitorlops/github-status>)
> **Server count:** ${client.guilds.cache.size}
*This bot was inspired in [Discord Status](<https://discord-status.red-panda.red/>) per [Ben!#0002](<https://red-panda.red/>)* ${emojis.ben}`;
}
