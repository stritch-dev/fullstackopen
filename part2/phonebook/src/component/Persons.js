import Person from "./Person";

const Persons = ({people}) =>
    <>
        <ul>
            {people.map(person =>
                <Person key={person.number} person={person}/>
            )}
        </ul>
    </>
export default Persons
