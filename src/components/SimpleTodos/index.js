// Write your code here
import {Component} from 'react'

import TodoItem from '../TodoItem'

import './index.css'

class SimpleTodos extends Component {
  state = {
    tasks: [],
    inputTask: '',
    counter: 0,
    editText: '',
    editIndex: -1,
    editCount: 0,
  }

  handleAddTask = taskName => {
    const [text, quantity] = taskName.split(/\s+(\d+)$/)
    const count = parseInt(quantity) || 1
    console.log(count)
    const newTasks = Array.from({length: count}, () => text)
    this.setState(prevState => ({
      tasks: [...prevState.tasks, ...newTasks],
      counter: prevState.counter + count,
    }))
  }

  onChangeInput = event => {
    this.setState({inputTask: event.target.value})
  }

  deleteTodo = index => {
    this.setState(prevState => {
      const updatedTask = [...prevState.tasks]
      const deletedTask = updatedTask.splice(index, 1)
      return {
        tasks: updatedTask,
        counter: prevState.counter - deletedTask.length,
      }
    })
  }

  submitForm = event => {
    event.preventDefault()
    const {inputTask} = this.state
    const inputText = inputTask.trim()
    if (inputText !== '') {
      this.handleAddTask(inputText)
      this.setState({inputTask: ''})
    }
  }

  editTextChange = event => {
    this.setState({editText: event.target.value})
  }

  changeIndex = index => {
    this.setState({editIndex: index})
  }

  updateText = () => {
    const {editIndex, editText} = this.state
    if (editText.trim() !== '') {
      this.setState(prevState => {
        const updatedTasks = [...prevState.tasks]
        updatedTasks[editIndex] = editText

        return {
          tasks: updatedTasks,
          editCount: prevState.editCount + 1,
          editIndex: -1,
          editText: '',
        }
      })
    }
  }

  handleCancelEdit = () => {
    this.setState({
      editIndex: -1,
    })
  }

  render() {
    const {
      inputTask,
      tasks,
      editIndex,
      editText,
      editCount,
      counter,
    } = this.state
    console.log(editCount)
    console.log(tasks)
    return (
      <div className="main-container">
        <h1>Day Goals!</h1>
        <form onSubmit={this.submitForm}>
          <input type="test" value={inputTask} onChange={this.onChangeInput} />
          <br />
          <button className="button-click-add" onClick={this.addTask}>
            Add a task
          </button>
        </form>
        <ul>
          {tasks.map((eachTask, index) => (
            <>
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={this.editTextChange}
                  />
                  <button type="button" onClick={this.updateText}>
                    update
                  </button>
                  <button type="button" onClick={this.handleCancelEdit}>
                    cancel
                  </button>
                </>
              ) : (
                <TodoItem
                  eachTask={eachTask}
                  index={index}
                  key={eachTask.id}
                  deleteTodo={this.deleteTodo}
                  changeIndex={this.changeIndex}
                />
              )}
            </>
          ))}
        </ul>
      </div>
    )
  }
}

export default SimpleTodos
