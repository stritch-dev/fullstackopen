import Numbers from './Numbers'
function Phonebook({onChange, persons, personsToShow, handleDelete}) {
    return <>
        <h2>Phonebook</h2>
        filter show with
        <input type="text" id="searchFilter" onChange={onChange}/>
        <Numbers persons={persons} personsToShow={personsToShow} handleDelete={handleDelete}/>
    </>
}

export default Phonebook
