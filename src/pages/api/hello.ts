import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
	name: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
	return res.json('John Doe');
};
