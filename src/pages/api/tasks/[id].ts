import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			return res.json('unique task');
		case 'PUT':
			return res.json('Update');
		case 'DELETE':
			return res.json('delete task');
		default:
			return res.status(400).json('Method not supported');
	}
};
