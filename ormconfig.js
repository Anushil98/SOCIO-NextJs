module.exports = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'admin1234',
	database: 'nextDb',
	synchronize: true,
	logging: true,
	entities: [ './**/entities/**/*.ts' ],
	migrations: [ './**/migration/**/*.ts' ],
	subscribers: [ './**/subscriber/**/*.ts' ],
	cli: {
		entitiesDir: 'src/entity',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber'
	}
};
