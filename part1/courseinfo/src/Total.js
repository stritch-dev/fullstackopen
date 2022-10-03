const Total = ({parts}) => {
				const [one, two, three] = parts;
				return (
								<> 
								<p>Number of exercises {
												one.exercises + two.exercises + three.exercises}
								</p> </>
				);};

export default Total
