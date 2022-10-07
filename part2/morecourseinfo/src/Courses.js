import Course from "./Course";

const Courses = ({courses}) =>  courses.map(course => <Course key={course.name} course={course}/>)

export default Courses

