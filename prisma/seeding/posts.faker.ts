import { PrismaClient } from '@prisma/client';
import { getRandomEntity } from './random-entity';

export async function generatePosts(faker: Faker.FakerStatic, prisma: PrismaClient, number: number) {
	const users = await prisma.user.findMany();

	const getPosts = () => {
		const numberOfPosts = faker.datatype.number({ min: 3, max: 10 });

		return new Array(numberOfPosts).fill('').map(() => ({
			content: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 3 })),
		}));
	};

	for (let i = 0; i < number; i++) {
		await prisma.user.update({
			where: {
				id: getRandomEntity(faker, users).id,
			},
			data: {
				posts: {
					createMany: {
						data: getPosts(),
					},
				},
			},
		});
	}
}
