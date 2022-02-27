import React from 'react';
import { Task } from '../interfaces/task';
interface Props {
	tasks: Task[];
}

export default function index({ tasks }: Props) {
	console.log(tasks);
	return <>{tasks.length === 0 ? <h1>Nothing to show</h1> : <h1>Showing</h1>}</>;
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
