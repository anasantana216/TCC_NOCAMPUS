import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPoll = async (req: Request, res: Response) => {
  try {
    const { title, description, category, location, startDate, endDate, options } = req.body;
    const userId = req.user.id; // Será definido pelo middleware de autenticação

    const poll = await prisma.poll.create({
      data: {
        title,
        description,
        category,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        createdById: userId,
        options: {
          create: options.map((option: string) => ({
            text: option,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar enquete' });
  }
};

export const getPolls = async (req: Request, res: Response) => {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        options: true,
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar enquetes' });
  }
};

export const getPoll = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: true,
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!poll) {
      return res.status(404).json({ message: 'Enquete não encontrada' });
    }

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar enquete' });
  }
};

export const vote = async (req: Request, res: Response) => {
  try {
    const { id, optionId } = req.params;

    // Incrementar votos na opção
    const option = await prisma.pollOption.update({
      where: { id: optionId },
      data: {
        votes: {
          increment: 1,
        },
      },
    });

    res.json(option);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao registrar voto' });
  }
};
