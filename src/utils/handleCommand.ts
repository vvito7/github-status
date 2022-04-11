import { Client } from 'discord.js';
import { APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';
import { interact } from './interactWithAPI';
import { about } from '../commands/about';
import { summary } from '../commands/summary';
import { config } from '../commands/config';

export async function handleCommand(
    client: Client,
    interaction: APIChatInputApplicationCommandInteraction
): Promise<void> {
    const { name, resolved } = interaction.data;

    if (name === 'summary') execute(interaction, await summary());
    else if (name === 'about') execute(interaction, about(client));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    else if (name === 'config') execute(interaction, await config(resolved!));
}

function execute(
    interaction: APIChatInputApplicationCommandInteraction,
    message: string,
): void {
    const { id, token } = interaction;

    interact(`interactions/${id}/${token}/callback`, 'POST', {
        'type': 4,
        'data': {
            'content': message,
            'flags': 64,
        }
    });
}
