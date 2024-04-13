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

export const getTagsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId)
            },
            include: {
                quiz: {
                    include: {
                        tags: {
                            select: {
                                id: true,
                                nameTag: true
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Extract tags from user's quizzes
        const tags = user.quiz.flatMap(quiz => quiz.tags);

        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};