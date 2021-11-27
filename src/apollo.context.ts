import { PrismaClient } from '@prisma/client';
import { prisma } from './prisma';

export interface ApolloContext {
	prisma: PrismaClient;
	request: Express.Request;
	response: Express.Response;
}

type Params = { req: Express.Request; res: Express.Response };

export const apolloContext = ({ req, res }: Params): ApolloContext => ({
	prisma,
	request: req,
	response: res,
});
