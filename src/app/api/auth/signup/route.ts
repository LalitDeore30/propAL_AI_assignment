import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const usersFilePath = path.join(process.cwd(), 'public', 'users.json');

async function readUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If the file doesn't exist, return an empty array
        return [];
    }
}

async function writeUsers(users: any) {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password, phoneNumber } = body;

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const users = await readUsers();
        if (users.some(user => user.email === email)) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = {
            id: `user_${Date.now()}`,
            username,
            email,
            password: hashedPassword,
            phoneNumber,
            createdAt: new Date().toISOString(),
        };

        // In a real app, save to database
        users.push(newUser);
        await writeUsers(users);

        // Create safe user object (without password)
        const safeUser = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
        };

        // Set user cookie
        cookies().set('user', JSON.stringify(safeUser), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return NextResponse.json(
            { message: 'User created successfully', user: safeUser },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
} 