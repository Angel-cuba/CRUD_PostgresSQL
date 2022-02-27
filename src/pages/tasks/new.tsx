/* eslint-disable react/jsx-key */
import { ChangeEvent, useState } from 'react';
import { Button, Card, Form, Icon } from 'semantic-ui-react';
import { newTask } from '../../interfaces/task';

export default function newPage() {
	const [task, setTask] = useState({
		title: '',
		description: '',
	});
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		console.log(e.target.name, e.target.value);
	};

	return (
		<div>
			<Card>
				<Card.Content>
					<Form style={{ textAlign: 'center' }}>
						<Form.Field>
							<label htmlFor="title">Title</label>
							<input type="text" name="title" placeholder="Write a title" onChange={handleChange} />
						</Form.Field>
						<Form.Field>
							<label htmlFor="description">Description</label>
							<textarea
								name="description"
								rows={3}
								placeholder="Write some description"
								onChange={handleChange}
							></textarea>
						</Form.Field>
						<Button>
							<Icon name="save" />
							Create a new task
						</Button>
					</Form>
				</Card.Content>
			</Card>
		</div>
	);
}
