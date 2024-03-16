import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Membuat kuis baru
export const createQuiz = async (req, res) => {
  const { title, jumlahSoal, image, tags, userId } = req.body;

  try {
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        jumlahSoal,
        image,
        userId: Number(userId),
        createdAt: new Date(), // Mengisi nilai createdAt dengan tanggal dan waktu saat ini
        tags: {
          create: tags.map((tag) => ({ nameTag: tag })),
        },
      },
    });
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

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
