export function getRandomEntity<T>(faker: Faker.FakerStatic, entities: T[]) {
	const index = faker.datatype.number({ max: entities.length - 1 });
	return entities[index];
}
