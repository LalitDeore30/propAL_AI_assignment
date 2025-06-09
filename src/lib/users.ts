import fs from 'fs/promises';
import path from 'path';

const usersFilePath = path.join(process.cwd(), 'public', 'users.json');

export async function readUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

export async function writeUsers(users: any) {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
} 