import { Args, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { FindManyRoleArgs, Role, RoleUsersArgs, User } from '../generated/type-graphql';
import { ApolloContext } from '../apollo.context';
import { PrismaInfoSelect } from '../decorators/prisma-select';
import { Prisma } from '@prisma/client';

@Resolver(_of => Role)
export class RoleResolver {
	@Query(_type => [Role!])
	async roles(
		@Ctx() ctx: ApolloContext,
		@PrismaInfoSelect() select: Prisma.RoleSelect,
		@Args() roleArgs: FindManyRoleArgs
	) {
		return await ctx.prisma.role.findMany({
			select,
			...roleArgs,
		});
	}

	@FieldResolver(_type => [User])
	async users(
		@Ctx() ctx: ApolloContext,
		@PrismaInfoSelect() select: Prisma.RoleSelect,
		@Root() role: Role,
		@Args() userArgs: RoleUsersArgs
	) {
		return await ctx.prisma.role
			.findUnique({
				select,
				where: {
					id: role.id,
				},
			})
			.users(userArgs);
	}
}
