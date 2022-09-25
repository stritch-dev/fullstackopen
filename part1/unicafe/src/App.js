import {useState} from 'react'
import {click} from "@testing-library/user-event/dist/click";

const App = () => {
    const [clicks, setClicks] = useState({good: 0, neutral: 0, bad: 0, total: 0})
    const handleGoodClick = () => {
        setClicks({...clicks, good: clicks.good + 1, total: clicks.total + 1})
    }
    const handleNeutralClick = () => setClicks({...clicks, neutral: clicks.neutral + 1, total: clicks.total + 1})
    const handleBadClick = () => {
        setClicks({...clicks, bad: clicks.bad + 1, total: clicks.total + 1})
    }
    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={handleGoodClick}>Good</button>
            <button onClick={handleNeutralClick}>Neutral</button>
            <button onClick={handleBadClick}>Bad</button>
            <Statistics clicks={clicks}/>
        </div>
    )
}

const StatisticLine = ({text, value}) => {
    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td>{text}: {value}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

const Statistics = ({clicks}) => {
    if (clicks.bad + clicks.good + clicks.neutral === 0) {
        return (
            <div>
                <h1>Statistics</h1>
                No feedback given
            </div>
        )
    }
    return (
        <div>
            <h1>Statistics</h1>
            <StatisticLine text="good" value={clicks.good}/>
            <StatisticLine text="neutral" value={clicks.neutral} />
            <StatisticLine text="bad" value={clicks.bad} />
            <StatisticLine text="all" value={clicks.total} />
            <StatisticLine text="average" value={(clicks.bad -clicks.bad)/clicks.total} />
            <StatisticLine text="positive" value={(100 * clicks.good/clicks.total)} /> </div>
    )
}

export default App