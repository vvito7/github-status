import { ApplicationCommandOptionType, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v10';

export const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [
    {
        'name': 'summary',
        'description': 'Returns a summary of the current status of the system'
    },
    {
        'name': 'about',
        'description': 'Returns information about me'
    },
    {
        'name': 'config',
        'description': 'Sets up the configuration for the bot',
        'options': [
            {
                'name': 'channel',
                'description': 'The announcement channel for the incidents',
                'required': true,
                'type': ApplicationCommandOptionType.Channel
            },
            {
                'name': 'role',
                'description': 'The role that will be mentioned in the announcement channel',
                'required': true,
                'type': ApplicationCommandOptionType.Role
            },
        ]
    }
];
