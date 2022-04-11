import fetch from 'node-fetch';
import { config } from 'dotenv';
config();

export function interact<T>(
    endpoint: string,
    methodType: string,
    body: Record<string, unknown>
): Promise<T> {
    return fetch(
        `https://discord.com/api/v10/${endpoint}`,
        {
            method: methodType,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bot ${process.env.botToken}`,
            }
        }
    ).then(res => {
        if (res.headers.get('content-type')?.includes('json')) {
            return res.json();
        } else {
            return res.text();
        }
    });
}
