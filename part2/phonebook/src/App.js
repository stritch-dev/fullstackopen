import { useState } from 'react'

const Person = ({person}) =>  <p>{person.name} {person.number}</p>
const preloadedPeople = [
{  name: 'Arto Hellas', number: '040-123456', id: 1 },
{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 } ]

const App = () => {
    const [persons, setPersons] = useState(preloadedPeople)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showWithFilter, setShowWithFilter] = useState('')

    const applyFilter = (event) => { setShowWithFilter(event.target.value) }

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson= {
            name: newName,
            number: newNumber
        }
        if (persons.find(p => newPerson.name.toLowerCase() === p.name.toLowerCase())){
            alert(`${newPerson.name} is already added to phonbook`)
        }
        setPersons(persons.concat(newPerson))
    }
    const nameChange = (event) => { setNewName(event.target.value) }
    const numberChange = (event) => { setNewNumber(event.target.value) }
    const personsToShow = persons.filter(p => p.name.toLowerCase().includes(showWithFilter.toLowerCase()))

    return (
        <div>
            <form>
                <div> name: <input  value={newName} onChange={nameChange}/> </div>
                <div> number: <input  value={newNumber} onChange={numberChange}/> </div>
                <div>
                    <button id="addPersonButton" type="submit" onClick={addPerson}>add</button>
                </div>
            </form>

            <h2>Phonebook</h2>
            filter show with
            <input type='text' id='searchFilter' onChange={applyFilter} />

            <h2>Numbers</h2>
            <ul>
                {personsToShow.map(person =>
                <Person key={person.number} person={person} />
                )}
            </ul>
        </div>
    )
}

export default App