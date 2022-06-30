import React from 'react'

interface Todo {
  description: string
  completed: boolean
}

interface State {
  todos: { [id: string]: Todo }
  todoInput: string
}

const initState: State = {
  todos: {},
  todoInput: '',
}

type Action =
  | { type: 'EditInput'; text: string }
  | { type: 'AddTodo'; id: string; description: string }
  | { type: 'ToggleTodoCompletion'; id: string }
  | { type: 'DeleteTodo'; id: string }

const reducer = (state: State, action: Action): State => {
  if (action.type === 'AddTodo') {
    const { id, description } = action
    return {
      ...state,
      todos: {
        ...state.todos,
        [id]: {
          description,
          completed: false,
        },
      },
    }
  }

  if (action.type === 'EditInput') {
    const { text } = action
    return {
      ...state,
      todoInput: text,
    }
  }

  if (action.type === 'DeleteTodo') {
    const { id } = action
    const { [id]: deletedTodo, ...todos } = state.todos
    return {
      ...state,
      todos,
    }
  }

  if (action.type === 'ToggleTodoCompletion') {
    const { id } = action
    const { [id]: todo, ...todos } = state.todos
    if (todo === undefined) return state
    return {
      ...state,
      todos: {
        ...todos,
        [id]: {
          ...todo,
          completed: !todo.completed,
        },
      },
    }
  }

  throw new Error('this cannot be happening')

  return state
}

export default function Todo() {
  const [state, dispatch] = React.useReducer(reducer, initState)

  const todos = Object.entries(state.todos).map(([id, todo]) => {
    return (
      <div
        key={id}
        className="grid grid-cols-[auto_1fr_auto] place-items-center"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            dispatch({ type: 'ToggleTodoCompletion', id })
          }}
        />
        <p>{todo.description}</p>
        <button onClick={() => dispatch({ type: 'DeleteTodo', id })}>
          Delete
        </button>
      </div>
    )
  })

  return (
    <div className="grid justify-center">
      <h1 className="text-center text-xl">Todo List</h1>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={state.todoInput}
          className={styledInput}
          onChange={(e) => {
            const { value } = e.target
            dispatch({ type: 'EditInput', text: value })
          }}
        />
        <button
          className={styledButton}
          onClick={() => {
            if (state.todoInput === '') return console.log('empty')
            const randomId = crypto.randomUUID()
            dispatch({
              type: 'AddTodo',
              id: randomId,
              description: state.todoInput,
            })
          }}
        >
          Add Todo
        </button>
      </div>
      <div>{todos}</div>
    </div>
  )
}

const styledButton =
  'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'

const styledInput =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
