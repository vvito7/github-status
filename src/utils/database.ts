import { Client } from 'pg';
import { config } from 'dotenv';
config();

const dbClient = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export function startDb(): void {
    dbClient.connect();
    dbClient.query('CREATE TABLE IF NOT EXISTS "guilds" ("channel" TEXT, "role" TEXT)');
}

export function sendData(rows: string[], values: string[]): void {
    dbClient.query(`INSERT INTO guilds (${rows.join(', ')}) VALUES (${values.join(', ')})`);
}

export function getData(): Promise<Record<string, string>[]> {
    return dbClient.query('SELECT * FROM guilds').then(res => res.rows);
}
