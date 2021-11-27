import { PrismaClient } from '@prisma/client';

export async function generateUsers(faker: Faker.FakerStatic, prisma: PrismaClient, number = 100) {
	for (let i = 0; i < number; i++) {
		const roles = [];
		const ids: number[] = [];
		for (let j = 0; j < 3; j++) {
			const roleId = faker.datatype.number({ min: 1, max: 3 });
			if (faker.datatype.boolean() && !ids.includes(roleId)) {
				ids.push(roleId);
				roles.push({
					id: roleId,
				});
			}
		}

		await prisma.user.create({
			data: {
				name: faker.name.firstName(),
				email: faker.unique(faker.internet.email),
				roles: {
					connect: roles
				},
			},
		});
	}
}
