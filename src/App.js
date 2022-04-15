
import './App.css';
import { useState } from 'react';



function App() {
  const [toDoTitle, setToDoTitle] = useState('')
  const [toDoList, setToDolist]= useState([]);
  const [editMode, setEditMode]= useState(false);
  const [editAbleToDo, setEditAbleTodo]= useState(null)
  
  const createHandler=(e)=>{
    e.preventDefault();
    if (toDoTitle !=="") {
      const newToDo={
        id: Date.now(),
        title: toDoTitle,
      }
      setToDolist([newToDo, ...toDoList])
      setToDoTitle("")

    }
  }
  const editHandler=(id)=>{
    let toDoToBeEdited= toDoList.find(item=>item.id===id)
    setEditMode(true)
    setEditAbleTodo(toDoToBeEdited)
    setToDoTitle(toDoToBeEdited.title)
  }
  const deleteHandler=(id)=>{
    const deleteToDo= toDoList.filter(item=>item.id!==id)
    setToDolist(deleteToDo);
  }
  const updateHandler=(e)=>{
    e.preventDefault();
    setToDolist(toDoList.map(todo=>{
      if (todo.id===editAbleToDo.id) {
        todo.title= toDoTitle;
        
      }
      return todo;
    }))
    setEditMode(false);
    setToDoTitle("")
    setEditAbleTodo(null);
    

  }
  return (
    <div className="App">
      <div className='toDo-app'>
      <form>
        <input type="text" placeholder='Create Todo'  value={toDoTitle} onChange={(e)=> setToDoTitle(e.target.value)} />
        <button className='Add-todo'  onClick={(e)=>
          editMode? updateHandler(e) :createHandler(e)}> 
        {editMode? "Update Todo": "Add Todo"}

         </button>
      </form>
      <ul>
      {toDoList.map(todo=>(
        <li>
          <span>
          {todo.title}
          </span>
          <button className='edit-button' onClick={()=>editHandler(todo.id)} >Edit</button>
          <button className='delete-button' onClick={()=>deleteHandler(todo.id)}>Delete</button>
          
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
}

export default App;
