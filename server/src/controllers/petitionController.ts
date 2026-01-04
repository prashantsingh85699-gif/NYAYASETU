import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { generatePetition } from '../services/aiService';

const prisma = new PrismaClient();

export const createPetition = async (req: Request, res: Response) => {
    try {
        const { type, title, questionnaireData, language } = req.body;

        if (!type || !title || !questionnaireData) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const petition = await prisma.petition.create({
            data: {
                userId: req.userId!,
                type,
                title,
                questionnaireData,
                language: language || 'en',
                status: 'draft'
            }
        });

        res.status(201).json(petition);
    } catch (error) {
        console.error('Create petition error:', error);
        res.status(500).json({ error: 'Failed to create petition' });
    }
};

export const generatePetitionContent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const petition = await prisma.petition.findFirst({
            where: { id, userId: req.userId! },
            include: { user: true }
        });

        if (!petition) {
            return res.status(404).json({ error: 'Petition not found' });
        }

        console.log(`[CONTROLLER] Generating petition for ID: ${id}, Type: ${petition.type}, Lang: ${petition.language}`);
        const generatedContent = await generatePetition({
            type: petition.type,
            language: petition.language,
            questionnaireData: petition.questionnaireData,
            userName: petition.user.name,
            userAddress: petition.user.address || '',
            userEmail: petition.user.email,
            userPhone: petition.user.phone || ''
        });

        const referenceNumber = `EJ-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const updatedPetition = await prisma.petition.update({
            where: { id },
            data: {
                generatedContent,
                status: 'completed',
                referenceNumber
            }
        });

        res.json(updatedPetition);
    } catch (error: any) {
        console.error('Generate petition error:', error);
        res.status(500).json({ error: error.message || 'Failed to generate petition' });
    }
};

export const getPetitions = async (req: Request, res: Response) => {
    try {
        const { status, type, search } = req.query;

        const where: any = { userId: req.userId! };
        if (status) where.status = status as string;
        if (type) where.type = type as string;

        const petitions = await prisma.petition.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                type: true,
                title: true,
                status: true,
                language: true,
                referenceNumber: true,
                createdAt: true,
                updatedAt: true
            }
        });

        res.json(petitions);
    } catch (error) {
        console.error('Get petitions error:', error);
        res.status(500).json({ error: 'Failed to fetch petitions' });
    }
};

export const getPetition = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const petition = await prisma.petition.findFirst({
            where: { id, userId: req.userId! }
        });

        if (!petition) {
            return res.status(404).json({ error: 'Petition not found' });
        }

        res.json(petition);
    } catch (error) {
        console.error('Get petition error:', error);
        res.status(500).json({ error: 'Failed to fetch petition' });
    }
};

export const updatePetition = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const petition = await prisma.petition.findFirst({
            where: { id, userId: req.userId! }
        });

        if (!petition) {
            return res.status(404).json({ error: 'Petition not found' });
        }

        const updated = await prisma.petition.update({
            where: { id },
            data: updates
        });

        res.json(updated);
    } catch (error) {
        console.error('Update petition error:', error);
        res.status(500).json({ error: 'Failed to update petition' });
    }
};

export const deletePetition = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const petition = await prisma.petition.findFirst({
            where: { id, userId: req.userId! }
        });

        if (!petition) {
            return res.status(404).json({ error: 'Petition not found' });
        }

        await prisma.petition.delete({ where: { id } });

        res.json({ message: 'Petition deleted successfully' });
    } catch (error) {
        console.error('Delete petition error:', error);
        res.status(500).json({ error: 'Failed to delete petition' });
    }
};

export const submitPetition = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const petition = await prisma.petition.findFirst({
            where: { id, userId: req.userId! }
        });

        if (!petition) {
            return res.status(404).json({ error: 'Petition not found' });
        }

        const updated = await prisma.petition.update({
            where: { id },
            data: {
                status: 'submitted',
                submittedAt: new Date()
            }
        });

        res.json(updated);
    } catch (error) {
        console.error('Submit petition error:', error);
        res.status(500).json({ error: 'Failed to submit petition' });
    }
};
