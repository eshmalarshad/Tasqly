import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import GalaxyTrail from './components/GalaxyTrail'
import { v4 as uuidv4 } from 'uuid'
import { FaRegEdit } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import './App.css'

function App() {
  const [todo, setTodo] = useState("") //input text
  const [todos, setTodos] = useState([])//hold all todos
  const [showfinished, setshowfinished] = useState(true)//hold all todos


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos);
    }
  }, [])

  const saveToLS = (e) => {
    localStorage.setItem("todos", JSON.stringify(e))
  }

  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    setEditId(id)

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS(newTodos)

  }
  const handleAdd = () => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    saveToLS(newTodos)
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }


 return (
  <GalaxyTrail>
    <Navbar />

    <div className="min-h-screen py-8 px-4 bg-[#f5f4ff]">
      <div className="md:container md:mx-auto md:w-1/2 bg-[#ffffffcc] backdrop-blur-md border border-white/40 shadow-xl rounded-3xl p-8 min-h-[80vh]">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className='font-bold text-4xl text-violet-900 tracking-tight'>
            Manage Your Todos
          </h1>

          <p className='text-violet-500 mt-2 text-sm'>
            Stay organized in a calm and simple way
          </p>
        </div>

        {/* Add Todo */}
        <div className="addTodo flex flex-col gap-4 mb-8">
          <h2 className='text-xl font-semibold text-violet-800'>
            Add a Todo
          </h2>

          <div className="flex gap-3">
            <input
              placeholder='Write Your Todo'
              onChange={handleChange}
              value={todo}
              type="text"
              className='w-full rounded-2xl px-5 py-3 bg-white border border-violet-200 outline-none focus:ring-2 focus:ring-violet-300 transition-all text-violet-900 placeholder:text-violet-300 shadow-sm'
            />

            <button
              disabled={todo.length <= 3}
              onClick={handleAdd}
              className='bg-violet-600 hover:bg-violet-700 transition-all duration-300 px-6 py-3 disabled:bg-violet-300 text-white rounded-2xl font-semibold shadow-md'
            >
              Save
            </button>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2 mb-5">
          <input
            onChange={toggleFinished}
            id='show'
            type="checkbox"
            checked={showfinished}
            className='accent-violet-600 w-4 h-4'
          />

          <label
            htmlFor="show"
            className='text-violet-700 font-medium'
          >
            Show Finished
          </label>
        </div>

        <div className="h-[1px] bg-violet-200 w-full mb-6"></div>

        {/* Todo Heading */}
        <h2 className='text-2xl font-bold text-violet-900 mb-5'>
          Your Todos
        </h2>

        {/* Todos */}
        <div className="todos flex flex-col gap-4">

          {todos.length === 0 && (
            <div className='text-center py-10 text-violet-400 font-medium bg-violet-50 rounded-2xl border border-dashed border-violet-200'>
              No Todo Tasks Yet
            </div>
          )}

          {todos.map(item => {
            return (
              (showfinished || !item.isCompleted) &&

              <div
                key={item.id}
                className="todo flex justify-between items-center gap-4 bg-white border border-violet-100 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-300"
              >

                <div className='flex gap-4 items-start w-full'>

                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className='accent-violet-600 mt-1 w-4 h-4'
                  />

                  <div
                    className={`${item.isCompleted ? "line-through text-violet-300" : "text-violet-900"
                      } break-words w-full text-[15px] leading-relaxed`}
                  >
                    {item.todo}
                  </div>
                </div>

                {/* Buttons */}
                <div className="buttons flex gap-2">

                  <button
                    onClick={(e) => { handleEdit(e, item.id) }}
                    className='bg-violet-100 hover:bg-violet-200 text-violet-700 p-3 rounded-xl transition-all'
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={(e) => { handleDelete(e, item.id) }}
                    className='bg-rose-100 hover:bg-rose-200 text-rose-600 p-3 rounded-xl transition-all'
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </GalaxyTrail>
)
}

export default App
