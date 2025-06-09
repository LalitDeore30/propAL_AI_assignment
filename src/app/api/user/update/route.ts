import { NextRequest, NextResponse } from 'next/server';
import { readUsers, writeUsers } from '@/lib/users';

export async function PUT(req: NextRequest) {
    try {
        const { userId, username, company } = await req.json();

        if (!userId || !username) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const users = await readUsers();
        const userIndex = users.findIndex((user: any) => user.id === userId);

        if (userIndex === -1) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Update user data
        const userToUpdate = users[userIndex];
        userToUpdate.username = username;
        userToUpdate.company = company || '';

        users[userIndex] = userToUpdate;
        await writeUsers(users);

        // Return the updated user data (without password)
        const { password: _, ...updatedUser } = userToUpdate;

        return NextResponse.json({ message: 'Profile updated successfully', user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 