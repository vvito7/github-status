import { interact } from './utils/interactWithAPI';
import { commands } from './commands';
import { config } from 'dotenv';
config();

const go = process.env.guildOnly;

commands.forEach(command => {
    interact(
        `applications/${process.env.applicationId}${go ? `/guilds/${process.env.guildId}` : ''}/commands`, 'POST', {
            'name': command.name,
            'description': command.description,
            'options': command.options ?? []
        }).then(res => console.log(res));
});
