import Total from './Total.js'
import Header from  './Header.js'
import Content from './Content.js'

const App = () => {
				const parts = [
								{
												name: 'Fundamentals of React',
												exercises: 10
								},
								{
												name: 'Using props to pass data',
												exercises: 7
								},
								{
												name: 'State of a component',
												exercises: 14
								}
				]

				const course = {
								name: 'Half Stack application development',
								parts: parts
				}

				return (
								<>
								<Header course={course} />
								<Content parts={parts} />
								<Total parts={parts} />
								</>
				)
}

export default App
