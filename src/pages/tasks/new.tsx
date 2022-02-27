/* eslint-disable react/jsx-key */
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Card, Form, Icon } from 'semantic-ui-react';
import { newTask, Task } from '../../interfaces/task';
import tasks from '../api/tasks';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function NewPage() {
	const [task, setTask] = useState({
		title: '',
		description: '',
	});
	const router = useRouter();
	const handleChange = ({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTask({ ...task, [name]: value });

	const createTask = async (task: Task) => {
		await fetch('http://localhost:3000/api/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(task),
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			createTask(task);
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<Card>
				<Card.Content>
					<Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
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
		</Layout>
	);
}
