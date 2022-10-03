import Header from './Header.js';
import Course from './Course.js';
import './App.css'

const App = () => {
	const courses = {
id: 1,
		name: 'Half Stack application development',
		parts: [
		{
name: 'Fundamentals of React',
			exercises: 10,
			id: 1
		},
		{
name: 'Using props to pass data',
			exercises: 7,
			id: 2
		},
		{
name: 'State of a component',
			exercises: 14,
			id: 3
		}
		]
	}


	const details = courses.parts;


	return (
			<div>
			<ul>
			{for (const detail in details) {
			<Course content={detail.name} sections={detail.exercises} />
			}
			}
			</ul>
			<Header title="Info" />

			</div>
			);
}

const Line = ({words}) => {
	return ( {words} );
};





export default App
