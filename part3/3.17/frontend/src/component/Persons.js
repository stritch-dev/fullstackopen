import Person from "./Person";

const Persons = ({people, handleDelete}) => {
  if(people.length === 0) {
    return(
      <p>No contacts found</p>
    )
  } else  {

    return(
      <>
          <ul>
                {people.map(person =>
                    <Person key={person.id} person={person} handleDelete={handleDelete}/>
                )}
            </ul>
        </>
    );
  }
}
export default Persons
