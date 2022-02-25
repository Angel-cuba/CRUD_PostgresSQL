import { Pool } from 'pg';

let connection: any;

if (!connection) {
	connection = new Pool({
		user: 'postgres',
		password: 'VeraMaria',
		host: 'localhost',
		port: 5432,
		database: 'testing',
	});
}

export { connection };
