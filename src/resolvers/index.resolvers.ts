import { NonEmptyArray } from 'type-graphql';
import { UserResolver } from './user.resolver';
import { RoleResolver } from './role.resolver';
import { PostResolver } from './post.resolver';
import { PostCommentResolver } from './post-comment.resolver';

// eslint-disable-next-line @typescript-eslint/ban-types
const resolvers: NonEmptyArray<Function> = [UserResolver, RoleResolver, PostResolver, PostCommentResolver];
export { resolvers };
