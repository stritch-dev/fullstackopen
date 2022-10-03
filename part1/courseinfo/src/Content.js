import Part from './Part.js'

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

export default Content
