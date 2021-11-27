import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Prisma } from '@prisma/client';
import { PostComment, User } from '../generated/type-graphql';
import { ApolloContext } from '../apollo.context';
import { PrismaInfoSelect } from '../decorators/prisma-select';

@Resolver(_of => PostComment)
export class PostCommentResolver {
	@FieldResolver(_type => User)
	async commenter(
		@Ctx() ctx: ApolloContext,
		@Root() postComment: PostComment,
		@PrismaInfoSelect() commenterSelect: Prisma.UserSelect
	) {
		return await ctx.prisma.postComment
			.findUnique({
				where: {
					id: postComment.id,
				},
				select: {
					commenter: {
						select: commenterSelect,
					},
				},
			})
			.commenter({});
	}
}
