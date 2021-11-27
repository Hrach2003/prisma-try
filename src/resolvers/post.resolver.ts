import { Args, Ctx, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { FindManyPostArgs, Post, PostComment, PostCommentsArgs, User } from '../generated/type-graphql';
import { ApolloContext } from '../apollo.context';
import { PrismaInfoSelect } from '../decorators/prisma-select';
import { Prisma } from '@prisma/client';

@Resolver(_of => Post)
export class PostResolver {
	@Query(_type => [Post!], {
		nullable: false,
	})
	async posts(
		@Ctx() ctx: ApolloContext,
		@PrismaInfoSelect() select: Prisma.PostSelect,
		@Args() postsArgs: FindManyPostArgs
	) {
		return await ctx.prisma.post.findMany({
			select,
			...postsArgs,
		});
	}

	@FieldResolver(_type => [PostComment!], {
		nullable: true,
	})
	async comments(
		@Ctx() ctx: ApolloContext,
		@Root() post: Post,
		@PrismaInfoSelect() commentSelect: Prisma.PostCommentSelect,
		@Args() commentsArg: PostCommentsArgs
	) {
		return await ctx.prisma.post
			.findUnique({
				where: {
					id: post.id,
				},
				select: {
					comments: {
						select: commentSelect,
					},
				},
			})
			.comments(commentsArg);
	}

	@FieldResolver(_type => User, {
		nullable: true,
	})
	async author(@Ctx() ctx: ApolloContext, @Root() post: Post, @PrismaInfoSelect() authorSelect: Prisma.UserSelect) {
		return await ctx.prisma.post
			.findUnique({
				where: {
					id: post.id,
				},
				select: {
					author: {
						select: authorSelect,
					},
				},
			})
			.author();
	}
}
