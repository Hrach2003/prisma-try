import { ApolloServerPlugin } from 'apollo-server-plugin-base/src/index';
import { FastifyInstance } from 'fastify';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-fastify';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { resolvers } from '../resolvers/index.resolvers';
import { apolloContext } from '../apollo.context';
import { executor } from '../executor/executor';

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
	return {
		async serverWillStart() {
			return {
				async drainServer() {
					await app.close();
				},
			};
		},
	};
}

export async function buildApolloServer(app: FastifyInstance) {
	const schema = await buildSchema({
		resolvers,
	});

	const server = new ApolloServer({
		context: apolloContext,
		executor: executor(schema),
		plugins: [fastifyAppClosePlugin(app), ApolloServerPluginDrainHttpServer({ httpServer: app.server })],
		schema,
	});

	await server.start();

	return server;
}
