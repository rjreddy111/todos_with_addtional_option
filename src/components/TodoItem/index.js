// Write your code here
// Write your code here
import {FaPencilAlt} from 'react-icons/fa'

import './index.css'

const TodoItem = props => {
  const {eachTask, deleteTodo, index, changeIndex, editCount} = props

  const onDeleteTodo = () => {
    deleteTodo(index)
  }

  const onClickEdit = () => {
    changeIndex(index)

    console.log(index)
  }

  return (
    <li className="todo-item">
      <p className="title">
        {eachTask} (Updated {editCount} times)
      </p>
      <FaPencilAlt size={12} className="pencil" onClick={onClickEdit} />
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        x
      </button>
    </li>
  )
}

export default TodoItem
