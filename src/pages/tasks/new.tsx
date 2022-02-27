/* eslint-disable react/jsx-key */
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Button, Card, Form, Grid, Icon, Confirm } from 'semantic-ui-react';
import { Task } from '../../interfaces/task';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

export default function NewPage() {
	const [task, setTask] = useState({
		title: '',
		description: '',
	});
	const [openConfirm, setOpenConfirm] = useState(false);
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
			if (typeof router.query.id === 'string') {
				updateTask(router.query.id, task);
			} else {
				createTask(task);
			}

			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	const loadTask = async (id: string) => {
		const res = await fetch('http://localhost:3000/api/tasks/' + id);
		const task = await res.json();
		console.log(task);
		setTask({ title: task.rows[0].title, description: task.rows[0].description });
	};

	const updateTask = async (id: string, task: Task) => {
		try {
			await fetch('http://localhost:3000/api/tasks/' + id, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(task),
			});
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteTask = async (id: string) => {
		try {
			await fetch('http://localhost:3000/api/tasks/' + id, { method: 'DELETE' });
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (typeof router.query.id === 'string') loadTask(router.query.id);
	}, [router.query]);

	return (
		<Layout>
			<Grid centered columns={3} verticalAlign="middle" style={{ height: '70%' }}>
				<Grid.Column>
					<Card>
						<Card.Content>
							<Form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
								<Form.Field>
									<label htmlFor="title">Title</label>
									<input
										type="text"
										name="title"
										placeholder="Write a title"
										onChange={handleChange}
										value={task.title}
									/>
								</Form.Field>
								<Form.Field>
									<label htmlFor="description">Description</label>
									<textarea
										name="description"
										rows={3}
										placeholder="Write some description"
										onChange={handleChange}
										value={task.description}
									></textarea>
								</Form.Field>
								{router.query.id ? (
									<Button color="teal">
										<Icon name="save" />
										Update
									</Button>
								) : (
									<Button>
										<Icon name="save" />
										Create a new task
									</Button>
								)}
							</Form>
						</Card.Content>
					</Card>
					{router.query.id && (
						<Button color="red" onClick={() => setOpenConfirm(true)}>
							Delete
						</Button>
					)}
				</Grid.Column>
			</Grid>
			<Confirm
				headers="Delete a task"
				content={`Sure of delete this taks with id ${router.query.id}?`}
				open={openConfirm}
				onCancel={() => setOpenConfirm(false)}
				onConfirm={() => typeof router.query.id === 'string' && handleDeleteTask(router.query.id)}
			/>
		</Layout>
	);
}
