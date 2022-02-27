/* eslint-disable react/jsx-key */
import React from 'react';
import { Card } from 'semantic-ui-react';
import { Task } from '../../interfaces/task';

interface Props {
	tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
	return (
		<Card.Group>
			{tasks.map((task) => (
				<Card key={task.id}>
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
