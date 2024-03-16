import { parseISO, endOfDay, startOfDay } from 'date-fns';
import { PrismaClient } from '@prisma/client'
import { Role } from '@prisma/client';

const prisma = new PrismaClient()



export const createUser = async (req, res) => {
  const { name, username, role } = req.body;

  // Memetakan nilai role ke enum Role
  const userRole = role === 'Learner' ? Role.Learner : Role.Instructor;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        role: userRole, // Menggunakan userRole yang telah dimapping
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Mendapatkan semua user
export const getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  // Mendapatkan user berdasarkan ID
  export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
