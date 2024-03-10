import {useEffect, useState} from 'react'
import Phonebook from './component/Phonebook'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [showWithFilter, setShowWithFilter] = useState("");
		const baseUrl = "/api/persons";

    useEffect(() => {
			axios.get(baseUrl).then(response => setPersons(response.data))
    }, []);

    const applyFilter = (event) => {
        setShowWithFilter(event.target.value)
    };

    const addPerson = event => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }
        addOrAlert(newPerson);
    };

    const nameChange = (event) => { setNewName(event.target.value) };

    const numberChange = (event) => { setNewNumber(event.target.value) };

    const personsToShow = persons.filter(p => p.name.toLowerCase().includes(showWithFilter.toLowerCase()));

    const addPersonForm =
        <form>
            <div id="nameInput"> name: <input value={newName} onChange={nameChange}/></div>
            <div id="numberInput"> number: <input value={newNumber} onChange={numberChange}/></div>
            <div>
                <button id="addPersonButton" type="submit" onClick={addPerson}>add</button>
            </div>
        </form>

    const phone =
        <Phonebook onChange={applyFilter} persons={persons} personsToShow={personsToShow}/>
    return (
        <div>
            {addPersonForm}
            {phone}
        </div>
    )

    //  - - - - - - - - Helper functions below - - - - - -

    function addOrAlert(newPerson) {
        if (persons.find(p => newPerson.name.toLowerCase() === p.name.toLowerCase())) {
            alert(`${newPerson.name} is already added to phonebook`)
        } else {
            axios.post('http://localhost:3001/persons', newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                })
        }
    }



}

export default App;
