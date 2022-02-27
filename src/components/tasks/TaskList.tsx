/* eslint-disable react/jsx-key */
import { useRouter } from 'next/router';
import React from 'react';
import { Card } from 'semantic-ui-react';
import { Task } from '../../interfaces/task';

interface Props {
	tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
	const router = useRouter();
	return (
		<Card.Group>
			{tasks.map((task) => (
				<Card key={task.id} onClick={() => router.push(`tasks/edit/${task.id}`)}>
					<Card.Content>
						<Card.Header>{task.title}</Card.Header>
						{task.created_on && (
							<Card.Meta>{new Date(task.created_on).toLocaleDateString()}</Card.Meta>
						)}
						<Card.Description>{task.description}</Card.Description>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	);
}
