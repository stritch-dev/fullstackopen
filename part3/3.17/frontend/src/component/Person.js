const Person = ({person, handleDelete}) => (
  <li>
    {person.name} {person.number} <a href={person ? `http://localhost:3001/api/persons/${person.id}` : ''}>details</a>
    &nbsp;&nbsp;
    <button onClick={() => handleDelete(person.id)}>delete</button>
  </li>
  );

export default Person
