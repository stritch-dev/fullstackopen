import { useState } from 'react'

const App = () => {
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
	const [rand, setRand] = useState(0)
	const [mostPopular, setMostPopular] = useState()
	const [maxVotes, setMaxVotes] = useState(0)

	const vote = anecdoteKey => {
		const newVotes = [...votes]
			newVotes[anecdoteKey] = newVotes[anecdoteKey] + 1
			setVotes(newVotes)
			setMostPopular(getMostPopular(newVotes, anecdotes))
	}

	const nextAnecdote = ()  =>  setRand(getRandomInt(0,anecdotes.length)) 

	const getMostPopular = (scores, values ) => {
		const max = Math.max(...scores)
		setMaxVotes(max)
		const i = scores.indexOf(max)
		return values[i] 
	}

	return (
			<div>
			<h1>Anecdote of the day</h1>
			{anecdotes[rand]}
			<br/>
			<br/> This anecdote has {votes[rand]} votes. <br/>

			<button onClick={() => vote(rand)}>vote for this anecdote</button> <br/>

			<button onClick={() => nextAnecdote()}>next anecdote</button> <br/>
			<br/>
			<br/>
			<h1> Anecdote with most votes</h1> 
			{mostPopular}<br/>
			{maxVotes ? `has ${maxVotes} votes`: ''}
			</div>
			)
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
	min = Math.ceil(min)
		max = Math.floor(max)
		return Math.floor(Math.random() * (max - min) + min) 
}

const anecdotes = [
	'If it hurts, do it more often.',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
	'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]




export default App
