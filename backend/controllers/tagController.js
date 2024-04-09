import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllTags = async (req, res) => {
    try {
        const response = await prisma.Tag.findMany({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};