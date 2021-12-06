import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import {useState, useEffect} from 'react'
import {Route, Routes, Link, useNavigate} from 'react-router-dom'

const h1 = {
  textAlign: "center",
  margin: "10px"
}

const button = {
  backgroundColor: "navy",
  display: "block",
  marign: "auto"
}
function App() {

///////////////////////////////////
// State and Other Variables
///////////////////////////////////

const navigate = useNavigate()
const url = "https://masonite-todos-backend-dg.herokuapp.com/todos/"
const [posts, setPosts] = useState([])

const nullTodo = {
  subject: "",
  details: ""
}

const [targetTodo, setTargetTodo] = useState(nullTodo)

///////////////////////////////////
// Functions
///////////////////////////////////

const getTodos = async() => {
  const response = await fetch(url)
  const data = await response.json()
  setPosts(data)
}

const addTodos = async (newTodo) => {
  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  })

  getTodos()
}

const getTargetTodo = (todo) => {
  setTargetTodo(todo)
  navigate('/edit')
}

const updateTodo = async (todo) => {
  await fetch(url + todo.id, {
    method: "put",
    headers: {
      "Content-TYpe": "application/json"
    },
    body: JSON.stringify(todo)
  })

  getTodos() 
}

const deleteTodo = async (todo) => {
  await fetch(url + todo.id, {
    method: "delete"
  })
  getTodos()
  navigate('/')
}


///////////////////////////////////
// useEffects
///////////////////////////////////

useEffect(()=>{
  getTodos()
}, [])

///////////////////////////////////
// Returned JSX
///////////////////////////////////


  return (
    <div className="App">
      <h1 style={h1}>My Todo List</h1>
      <Link to='/new'><button style={button}>Create New Todo</button></Link>
      <Routes>
        <Route path='/' element={<AllPosts posts={posts}/>}/>
        <Route path='/post/:id' element={<SinglePost 
        posts={posts}
        edit={getTargetTodo}
        deleteTodo={deleteTodo}/>}/>
        <Route path='/new' element={<Form
          initialTodo = {nullTodo}
          handleSubmit= {addTodos}
          buttonLable = "Create Todo"
        />}/>
        <Route path='/edit' element={<Form
          initialTodo={targetTodo}
          handleSubmit={updateTodo}
          buttonLabel="Update Todo"
        />}/>
      </Routes>
    </div>
  );
}

export default App;
