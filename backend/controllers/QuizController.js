// import { parseISO, endOfDay, startOfDay } from 'date-fns';
import { PrismaClient } from '@prisma/client'
import cloudinary from '../config/cloudinaryConfig.js'

const prisma = new PrismaClient()
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

}
export const createQuiz = async (req, res) => {
    try {
        const { title, jumlahSoal, link, userId, tags } = req.body
        const image = req.file ? req.file.path : null;
        console.log(req.body)
        console.log(req.file)

        if (!title || !jumlahSoal || !link || !userId === 0) {
            return res.status(400).json({ msg: 'Semua field harus diisi' });
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
                    connect: { id: parseInt(userId) }
                },
                tags: {
                    connectOrCreate: tagsArray.map(tag => ({
                        where: { nameTag: tag.nameTag },
                        create: { nameTag: tag.nameTag }
                    }))
                }
            },

            include: {
                tags: true
            }
        })

        console.log("req body: berhasil")
        console.log("new quiz: ", newQuiz)


        return res.status(201).json({
            msg: 'Berhasil membuat quiz baru',
            data: {
                id: newQuiz.id,
                title: newQuiz.title,
                jumlahSoal: newQuiz.jumlahSoal,
                link: newQuiz.link,
                image: newQuiz.image,
                user: newQuiz.user,
                tags: newQuiz.tags
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Terjadi kesalahan saat membuat quiz baru' })
    }

}