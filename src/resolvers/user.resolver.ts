import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import {
	FindManyUserArgs,
	Post,
	Role,
	RoleWhereUniqueInput,
	User,
	UserCreateWithoutRolesInput,
	UserPostsArgs,
	UserRolesArgs,
	UserWhereUniqueInput,
} from '../generated/type-graphql';
import { ApolloContext } from '../apollo.context';
import { PrismaInfoSelect } from '../decorators/prisma-select';
import { Prisma } from '@prisma/client';

@Resolver(_of => User)
export class UserResolver {
	@Query(_type => [User!])
	async users(
		@Ctx() ctx: ApolloContext,
		@Args() args: FindManyUserArgs,
		@PrismaInfoSelect() select: Prisma.UserSelect
	) {
		return await ctx.prisma.user.findMany({
			select,
			...args,
		});
	}

	@Query(_type => User, {
		nullable: true,
	})
	async user(
		@Ctx() ctx: ApolloContext,
		@Arg('where') where: UserWhereUniqueInput,
		@PrismaInfoSelect() select: Prisma.UserSelect
	) {
		return await ctx.prisma.user.findUnique({
			where,
			select,
		});
	}

	@Mutation(_type => User)
	async create(
		@Ctx() ctx: ApolloContext,
		@PrismaInfoSelect() select: Prisma.UserSelect,
		@Arg('user') userCreateInput: UserCreateWithoutRolesInput,
		@Arg('roles', () => [RoleWhereUniqueInput]) rolesConnectInput: RoleWhereUniqueInput[]
	) {
		return await ctx.prisma.user.create({
			data: {
				email: userCreateInput.email,
				name: userCreateInput.name,
				roles: {
					connect: rolesConnectInput,
				},
			},
			select,
		});
	}

	@FieldResolver(_type => [Post], {
		nullable: false,
	})
	async posts(
		@Ctx() ctx: ApolloContext,
		@Root() user: User,
		@PrismaInfoSelect() select: Prisma.PostSelect,
		@Args() userPostsArgs: UserPostsArgs
	) {
		return await ctx.prisma.user
			.findUnique({
				select: {
					posts: {
						select,
					},
				},
				where: {
					id: user.id,
				},
			})
			.posts(userPostsArgs);
	}

	@FieldResolver(_type => [Role!], {
		nullable: false,
	})
	async roles(
		@Ctx() ctx: ApolloContext,
		@Root() user: User,
		@PrismaInfoSelect() select: Prisma.RoleSelect,
		@Args() roleArgs: UserRolesArgs
	) {
		return await ctx.prisma.user
			.findUnique({
				select: {
					roles: {
						select,
					},
				},
				where: {
					id: user.id,
				},
			})
			.roles(roleArgs);
	}
}
