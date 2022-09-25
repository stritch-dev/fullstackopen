const Header = ({course}) => {
				return (
								<div>
								{course.name}
								</div>
				);
};

const Content = ({parts}) => {
				const [one, two, three] = parts;
				return (
								<div>
								<Part details={one} /> 
								<Part details={two} /> 
								<Part details={three} /> 
								</div>
				);
};

const Part = ({details}) =>  <p> {details.name} {details.exercises} </p> ;

const Total = ({parts}) => {
				const [one, two, three] = parts;
				return (
								<> 
								<p>Number of exercises {
												one.exercises + two.exercises + three.exercises}
								</p> </>
				);};


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
