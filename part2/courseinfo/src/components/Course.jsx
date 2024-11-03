const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
      return sum + part.exercises
  },0)

  return <strong>total of {total} exercises</strong>;
}


const Content = ({ parts }) => 
  <>
  {parts.map((part, i) => 
    <div key={i}>
      {part.name + ' '}
      {part.exercises}
    </div>
  )}
  </>

const Course = ({course}) =>
  <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
  </>

export default Course;