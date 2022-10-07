const Header = ({title}) => {
	console.log("title", title)
	return <div><h1>{title}</h1></div>

};

// {parts.map(part => <h2 key={part.name}>{part.name} {part.exercises}</h2>)}


export default Header;
