const Sum = ({parts}) => {
    const sum = parts.map(x=>x.exercises).reduce((prior, current) => prior + current)
    return  <h3>Total Exercises {sum}</h3>
}
export default Sum