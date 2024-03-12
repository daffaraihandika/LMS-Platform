import { parseISO, endOfDay, startOfDay } from "date-fns";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getQuiz = async (req, res) => {
  try {
    const response = await prisma.Quiz.findMany({
      include: {
        user: true,
        tags: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getQuizByUser = async (req, res) => {
  const userId = req.params.userId; // mengambil userId dari parameter
  try {
    const response = await prisma.Quiz.findMany({
      where: {
        userId: Number(userId), // filter berdasarkan userId
      },
      include: {
        tags: true,
        user: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
