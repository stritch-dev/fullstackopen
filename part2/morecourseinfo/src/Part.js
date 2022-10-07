const Parts = ({parts}) => {
    return  parts.map(({exercises, name}) => <h2 key={name}>{name} {exercises}</h2>)
}
export default Parts