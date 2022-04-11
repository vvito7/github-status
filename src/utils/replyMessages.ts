/* eslint-disable max-len */
import { emojis } from './emojis.json';

export const initialMessage = `
${emojis.wumpus} Hi! Just letting you know that **you need to use at least one command in order to me to work**.
Use **\`/config\`** to set the announcement channel and the role to mention when GitHub has an incident.
*And you are done!* ${emojis.done}
`;

export const configContent = `
Use the selects to set the **announcement channel** and the **role to mention** when GitHub has an incident. ${emojis.mmlol}
After choosing, you can just dismiss both messages.
`;
