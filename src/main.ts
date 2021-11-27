import 'reflect-metadata';
import fastify from 'fastify';
import { prisma } from './prisma';
import { buildApolloServer } from './apollo/start-server';

async function main() {
	const app = fastify();
	const apolloServer = await buildApolloServer(app);

	app.register(apolloServer.createHandler());
	await app.listen(3000);
	console.log(`Server started at http://localhost:${3000}${apolloServer.graphqlPath}`);
}

main()
	.catch(error => {
		throw error;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
