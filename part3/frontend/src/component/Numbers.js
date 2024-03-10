import Persons from './Persons'

const Numbers = ({persons, personsToShow}) =>
    <>
        <h2>Phone Numbers</h2>
        <Persons people={personsToShow} />
    </>

export default Numbers
