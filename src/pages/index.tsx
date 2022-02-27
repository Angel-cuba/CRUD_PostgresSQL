import { useRouter } from 'next/router';
import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import TaskList from '../components/tasks/TaskList';
import { Task } from '../interfaces/task';
interface Props {
	tasks: Task[];
}

export default function IndexPage({ tasks }: Props) {
	const router = useRouter();
	return (
		<>
			{tasks.length === 0 ? (
				<Grid>
					<Grid.Row columns={3} centered verticalAlign="middle" style={{ height: '70%' }}>
						<Grid.Column>
							<h1>No task yet</h1>
							<Button onClick={() => router.push('/tasks/new')}>Create Task</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			) : (
				<TaskList tasks={tasks} />
			)}
		</>
	);
}
export const getServerSideProps = async () => {
	const response = await fetch('http://localhost:3000/api/tasks');
	const tasks = await response.json();
	return {
		props: {
			tasks: tasks,
		},
	};
};
