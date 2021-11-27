import { Prisma, PrismaClient } from '@prisma/client';
import { getRandomEntity } from './random-entity';

export async function generateComments(faker: Faker.FakerStatic, prisma: PrismaClient, number: number) {
	const posts = await prisma.post.findMany();
	const users = await prisma.user.findMany();

	const getComments = (): Prisma.PostCommentCreateManyPostInput[] => {
		const numberOfComments = faker.datatype.number({ min: 1, max: 10 });

		return new Array(numberOfComments).fill('').map(() => ({
			comment: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 2 })),
			commenterId: getRandomEntity(faker, users).id,
		}));
	};

	for (let i = 0; i < number; i++) {
		await prisma.post.update({
			where: {
				id: getRandomEntity(faker, posts).id,
			},
			data: {
				comments: {
					createMany: {
						data: getComments(),
					},
				},
			},
		});
	}
}
