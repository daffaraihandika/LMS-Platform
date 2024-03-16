import { parseISO, endOfDay, startOfDay } from 'date-fns';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mendapatkan semua tag
export const getTags = async (req, res) => {
    try {
      const tags = await prisma.tag.findMany();
      res.status(200).json(tags);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Mendapatkan tag berdasarkan ID
  export const getTagById = async (req, res) => {
    const { id } = req.params;
    try {
      const tag = await prisma.tag.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(tag);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Membuat tag baru
  export const createTag = async (req, res) => {
    const { nameTag } = req.body;
    try {
      const newTag = await prisma.tag.create({
        data: {
          nameTag,
        },
      });
      res.status(201).json(newTag);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Mengupdate tag
  export const updateTag = async (req, res) => {
    const { id } = req.params;
    const { nameTag } = req.body;
    try {
      const updatedTag = await prisma.tag.update({
        where: { id: Number(id) },
        data: {
          nameTag,
        },
      });
      res.status(200).json(updatedTag);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Menghapus tag
  export const deleteTag = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTag = await prisma.tag.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedTag);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };

