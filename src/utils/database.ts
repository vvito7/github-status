import { Client } from 'pg';
import { config } from 'dotenv';
config();

const dbClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export function startDb(): void {
    dbClient.connect();
    dbClient.query('CREATE TABLE IF NOT EXISTS "guilds" ("channel" TEXT, "role" TEXT, "msg_id" TEXT)');
}

export function sendData(
    rows: string[] | string,
    values: string[] | string | null,
    condition?: string
): void {
    if (Array.isArray(rows) && Array.isArray(values)) {
        dbClient.query(`INSERT INTO "guilds" (${rows.join(', ')}) VALUES (${values.join(', ')})`);
    } else {
        dbClient.query(`UPDATE "guilds" SET ${rows} = ${values} WHERE "channel" = '${condition}'`);
    }
}

export function getData(): Promise<Record<string, string>[]> {
    return dbClient.query('SELECT * FROM guilds').then(res => res.rows);
}
