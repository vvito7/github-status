import { applicationId, guildOnly, guildId } from './config.json';
import { interact } from './utils/interactWithAPI';
import { commands } from './commands';

const go = guildOnly;

commands.forEach(command => {
    interact(`applications/${applicationId}${go ? `/guilds/${guildId}` : ''}/commands`, 'POST', {
        'name': command.name,
        'description': command.description,
        'options': command.options ?? []
    });
});
