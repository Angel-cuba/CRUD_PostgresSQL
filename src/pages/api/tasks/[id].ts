import { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '../../../utils/db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query, body } = req;
	switch (method) {
		case 'GET':
			try {
				const querySQL = 'SELECT * FROM tasks WHERE id = $1';
				const values = [query.id];
				const response = await connection.query(querySQL, values);

				if (response.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
				return res.json(response);
			} catch (error: any) {
				return res.status(400).json({ error: error.message });
			}
		case 'PUT':
			try {
				const { title, description } = body;
				const querySQL = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *';
				const values = [title, description, query.id];
				const response = await connection.query(querySQL, values);

				if (response.rowCount === 0) return res.status(404).json({ message: 'Task not found' });
				return res.json(response);
			} catch (error: any) {
				return res.status(400).json({ error: error.message });
			}
		case 'DELETE':
			try {
				const querySQL = 'DELETE FROM tasks WHERE id = $1';
				const values = [query.id];
				const response = await connection.query(querySQL, values);

				if (response.rowCount === 0) return res.status(404).json({ message: 'Task not found' });
				return res.json(response);
			} catch (error: any) {
				return res.status(400).json({ error: error.message });
			}
		default:
			return res.status(400).json('Method not supported');
	}
};
