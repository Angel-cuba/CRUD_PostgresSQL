import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '../../utils/db';

type Data = {
	message: string;
	time: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const response = await connection.query('SELECT NOW()');

	return res.json({ message: 'connected', time: response.rows[0].now });
};
