import { createParamDecorator } from 'type-graphql';
import { PrismaSelect } from '@paljs/plugins';
import { ApolloContext } from '../apollo.context';

export function PrismaInfoSelect() {
	return createParamDecorator<ApolloContext>(({ info }) => {
		const query = new PrismaSelect(info);
		return {
			...query.value.select,
			id: true,
		};
	});
}
