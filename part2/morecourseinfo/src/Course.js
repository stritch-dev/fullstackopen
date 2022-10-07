import Header from "./Header";
import Parts from "./Part"
import Sum from "./Sum"


const Course = ({course}) => {
    return (
        <>
            <h1><Header title={course.name}/></h1>
            <Parts parts={course.parts}/>
            <Sum parts={course.parts}/>
        </>
    )
}
export default Course
