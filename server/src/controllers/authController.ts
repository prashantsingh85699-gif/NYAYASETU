import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name, phone, address, city, state, language } = req.body;

        // Validation
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        // Check existing user
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone,
                address,
                city,
                state,
                language: language || 'en'
            }
        });

        // Generate token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
        );

        res.status(201).json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                language: user.language
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                language: user.language
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                language: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const updateLanguage = async (req: Request, res: Response) => {
    try {
        const { language } = req.body;

        const user = await prisma.user.update({
            where: { id: req.userId },
            data: { language }
        });

        res.json({ language: user.language });
    } catch (error) {
        console.error('Update language error:', error);
        res.status(500).json({ error: 'Failed to update language' });
    }
};

export const mockSocialLogin = async (req: Request, res: Response) => {
    try {
        const { provider } = req.body; // 'google' or 'facebook'

        if (!provider) {
            return res.status(400).json({ error: 'Provider is required' });
        }

        const email = `${provider}_test_user@ejagriti.com`;
        const name = `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`;

        // Check if user exists, or create one
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            const hashedPassword = await bcrypt.hash('temp_password', 10);
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    language: 'en'
                }
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRE || '7d' } as any
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                language: user.language
            }
        });
    } catch (error) {
        console.error('Social Login error:', error);
        res.status(500).json({ error: 'Social login failed' });
    }
};
