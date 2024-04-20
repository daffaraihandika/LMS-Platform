import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinaryConfig.js";

const prisma = new PrismaClient();
export const getQuiz = async (req, res) => {
  try {
    const { tag } = req.query;
    let response;

    // Jika tag ada, maka filter berdasarkan tag
    if (tag) {
      response = await prisma.Quiz.findMany({
        where: {
          tags: {
            some: {
              nameTag: tag,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          user: true,
          tags: true,
        },
      });
    } else {
      response = await prisma.Quiz.findMany({
        orderBy: {
          id: 'desc', // Mengurutkan berdasarkan id secara descending
        },
        include: {
          user: true,
          tags: true,
        },
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getQuizByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { tag } = req.query;
    let response;

    // Jika tag ada, maka filter berdasarkan tag
    if (tag) {
      response = await prisma.Quiz.findMany({
        where: {
          userId: Number(userId),
          tags: {
            some: {
              nameTag: tag,
            },
          },
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          tags: true,
          user: true,
        },
      });
    } else {
      response = await prisma.Quiz.findMany({
        where: {
          userId: Number(userId),
        },
        orderBy: {
          id: 'desc',
        },
        include: {
          tags: true,
          user: true,
        },
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID quiz harus diisi" });
    }

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
        tags: true,
      },
    });

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz tidak ditemukan" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Terjadi kesalahan saat mengambil quiz" });
  }
};


export const createQuiz = async (req, res) => {
  try {
    const { title, jumlahSoal, link, userId, tags } = req.body;
    const image = req.file ? req.file.path : null;
    console.log(req.body);
    console.log(req.file);

    if (!title || !jumlahSoal || !link || !userId === 0) {
      return res.status(400).json({ msg: "Semua field harus diisi" });
    }

    // Upload gambar ke Cloudinary
    let cloudinaryImage;
    if (image) {
      cloudinaryImage = await cloudinary.uploader.upload(image);
    }

    const tagsArray = Array.isArray(tags) ? tags : [];

    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        jumlahSoal: parseInt(jumlahSoal),
        link,
        image: cloudinaryImage ? cloudinaryImage.secure_url : null,
        user: {
          connect: { id: parseInt(userId) },
        },
        tags: {
          connectOrCreate: tagsArray.map((tag) => ({
            where: { nameTag: tag.nameTag },
            create: { nameTag: tag.nameTag },
          })),
        },
      },

      include: {
        tags: true,
      },
    });
    console.log("quiz: ", newQuiz);

    return res.status(201).json({
      msg: "Berhasil membuat quiz baru",
      data: {
        id: newQuiz.id,
        title: newQuiz.title,
        jumlahSoal: newQuiz.jumlahSoal,
        link: newQuiz.link,
        image: newQuiz.image,
        user: newQuiz.user,
        tags: newQuiz.tags,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat membuat quiz baru" });
  }
};

export const editQuiz = async (req, res) => {
  try {
    const quizId = parseInt(req.params.quizId, 10);
    const { title, jumlahSoal, link, userId, tags } = req.body;

    if (!title || !jumlahSoal || !link || !userId) {
      return res.status(400).json({ msg: 'Semua field harus diisi' });
    }

    const tagsArray = Array.isArray(tags) ? tags : [];

    const updatedTags = tagsArray.map(tag => ({
      where: { nameTag: tag.nameTag }, // Gunakan `nameTag` sebagai kriteria pemilihan tag
      create: { nameTag: tag.nameTag } // Buat tag baru jika tidak ditemukan
    }));

    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { tags: true },
    });

    if (!existingQuiz) {
      return res.status(404).json({ msg: 'Quiz tidak ditemukan' });
    }

    const image = req.file ? req.file.path : existingQuiz.image;

    // Upload gambar ke Cloudinary
    let cloudinaryImage;
    if (image) {
      cloudinaryImage = await cloudinary.uploader.upload(image);
    }

    // Temukan tag untuk diputuskan koneksi (hapus)
    const tagsToDisconnect = existingQuiz.tags.filter(existingTag =>
      !tagsArray.some(newTag => newTag.nameTag === existingTag.nameTag)
    );

    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: {
        title,
        jumlahSoal: parseInt(jumlahSoal),
        link,
        image: cloudinaryImage ? cloudinaryImage.secure_url : null,
        user: {
          connect: { id: parseInt(userId) }
        },
        tags: {
          connectOrCreate: updatedTags,
          disconnect: tagsToDisconnect.map(tag => ({ id: tag.id })),
        }
      },
      include: {
        tags: true
      }
    });

    return res.status(200).json({
      msg: 'Berhasil mengedit quiz',
      data: {
        id: updatedQuiz.id,
        title: updatedQuiz.title,
        jumlahSoal: updatedQuiz.jumlahSoal,
        link: updatedQuiz.link,
        image: updatedQuiz.image,
        user: updatedQuiz.user,
        tags: updatedQuiz.tags
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Terjadi kesalahan saat mengedit quiz' });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "ID quiz harus diisi" });
    }

    // Menghapus quiz
    const deletedQuiz = await prisma.quiz.delete({
      where: {
        id: parseInt(id),
      },
      include: {
        tags: true,
      },
    });

    // Mengambil tag-tag yang terkait dengan quiz yang dihapus
    const deletedQuizTags = deletedQuiz.tags.map(tag => tag.nameTag);

    // Mengecek apakah ada quiz lain yang masih menggunakan tag yang terkait
    const otherQuizzes = await prisma.quiz.findMany({
      where: {
        id: {
          not: parseInt(id),
        },
        tags: {
          some: {
            nameTag: {
              in: deletedQuizTags,
            },
          },
        },
      },
    });

    // Jika tidak ada quiz lain yang menggunakan tag tersebut, hapus tag dari database
    const tagsToDelete = deletedQuizTags.filter(tag => !otherQuizzes.some(quiz => quiz.tags.some(qTag => qTag.nameTag === tag)));

    await Promise.all(tagsToDelete.map(async (tagName) => {
      await prisma.tag.deleteMany({
        where: {
          nameTag: tagName,
        },
      });
    }));

    return res.status(200).json({
      msg: `Berhasil menghapus quiz ${deletedQuiz.title}`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Terjadi kesalahan saat menghapus quiz" });
  }
};