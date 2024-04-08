import Persons from './Persons'

const Numbers = ({persons, personsToShow, handleDelete}) =>
    <>
        <h2>Numbers</h2>
        <Persons people={personsToShow} handleDelete={handleDelete} />
    </>

export default Numbers
