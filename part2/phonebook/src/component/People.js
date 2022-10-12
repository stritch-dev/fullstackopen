import Person from "./Person";

const People = ({people}) =>  people.map(person => <Person key={person.name} number={person.number}/>)

export default People
