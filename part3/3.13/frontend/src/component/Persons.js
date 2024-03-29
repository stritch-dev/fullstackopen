import Person from "./Person";

const Persons = ({people}) => {
  if(people.length === 0) {
    return(
      <p>No contacts found</p>
    )
  } else  {

    return(
      <>
          <ul>
                {people.map(person =>
                    <Person key={person._id} person={person}/>
                )}
            </ul>
        </>
    );
  }
}
export default Persons
