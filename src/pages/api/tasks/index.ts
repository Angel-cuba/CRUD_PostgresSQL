import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;

	switch (method) {
		case 'GET':
			res.status(200).json('Getting task');
			break;
		case 'POST':
			res.status(200).json('Creating task');
			break;
		default:
			res.status(400).json('Invalid method');
			break;
	}
};
