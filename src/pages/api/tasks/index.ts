import { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '../../../utils/db';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req;

	switch (method) {
		case 'GET':
			try {
				const querySQL = 'SELECT * FROM tasks';
				const response = await connection.query(querySQL);
				console.log(response);
				return res.status(200).json(response.rows);
			} catch (error: any) {
				return res.status(400).json({ error: error.message });
			}
		case 'POST':
			try {
				const { title, description } = body;
				const querySQL = 'INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *';
				const values = [title, description];

				const response = await connection.query(querySQL, values);
				console.log(response);
				return res.status(200).json(response.rows[0]);
			} catch (error: any) {
				return res.status(400).json({ error: error.message });
			}

		default:
			return res.status(400).json('Invalid method');
	}
};
