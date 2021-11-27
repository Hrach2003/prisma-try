import { faker, prisma } from './faker';

async function main() {
	// await generateUsers(faker, prisma, 3000);
	// await generatePosts(faker, prisma, 3000);
	// await generateComments(faker, prisma, 4000);
	await prisma.user.updateMany({
		data: {
			avatar: {
				set: faker.image.avatar(),
			},
		},
	});
}

main()
	.catch(e => {
		throw e;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
