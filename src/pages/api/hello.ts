import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '../../utils/db';

type Data = {
	name: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
	return res.json({ message: 'connected' });
};
