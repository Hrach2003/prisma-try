import faker from 'faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
faker.seed(Math.floor(1_000_000_000 * Math.random()));

export { faker, prisma };
