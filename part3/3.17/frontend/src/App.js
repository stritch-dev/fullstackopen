import {useEffect, useState} from 'react'
import Phonebook from './component/Phonebook'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showWithFilter, setShowWithFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/persons')
      .then(response => setPersons(response.data))
      .catch(error => alert(error)) // TODO: handle error
  }, []) ;

  const applyFilter = (event) => {
    setShowWithFilter(event.target.value)
  };


  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/persons/${id}`)
      .then(response => {
        console.log("deleted");
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => alert(error)); 
  };



  const addOrUpdate = event => {
    event.preventDefault()
    const newPerson = { "name": newName, "number": newNumber };
    const existingPerson = persons.find(person => person.name === newName);
    if (!existingPerson) {
      add(newPerson);
    } else {
      newPerson._id = existingPerson.id;
      update(existingPerson, newPerson);
    }
    resetForm()
  };

  const add = (newPerson) => {
    axios.post('http://localhost:3001/api/persons', newPerson)
     .then(response => {
       setPersons(persons.concat(response.data))
      }).catch(error => {
        alert(error)
      });
  }

  const update = (existingPerson, newPerson) => {
    axios.put(`http://localhost:3001/api/persons/${existingPerson.id}`, newPerson)
      .then(response => {
        console.log("updated");
        const updatedPerson = response.data;
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
      });
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // this assums that only correct data is received from the database
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(showWithFilter.toLowerCase()))


  const addPersonForm =
    <form>
    <div id="nameInput"> name: <input value={newName} onChange={nameChange}/></div>
    <div id="numberInput"> number: <input value={newNumber} onChange={numberChange}/></div>
    <div>
    <button id="addPersonButton" type="submit" onClick={addOrUpdate}>add or update</button>
    </div>
    </form>

    const phone =
    <Phonebook onChange={applyFilter} persons={persons} personsToShow={personsToShow} handleDelete={handleDelete}/>

    return (
      <div>
      {addPersonForm}
      {phone}
      </div>
    )




  function resetForm() {
    setNewName('');
    setNewNumber('') 
  } 
}

export default App
