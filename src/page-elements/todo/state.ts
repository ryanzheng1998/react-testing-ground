import create from 'zustand'

interface Todo {
  description: string
  completed: boolean
}

interface State {
  todos: { [id: string]: Todo }
  todoInput: string
  editInput: (text: string) => void
  addTodo: (id: string, description: string) => void
  toggleTodoCompletion: (id: string) => void
  deleteTodo: (id: string) => void
}

export const useStore = create<State>((set) => ({
  todos: {},
  todoInput: '',
  editInput: (text: string) => set((state) => ({ ...state, todoInput: text })),
  addTodo: (id, description) =>
    set((state) => ({
      todoInput: '',
      todos: {
        ...state.todos,
        [id]: {
          description,
          completed: false,
        },
      },
    })),
  toggleTodoCompletion: (id) =>
    set((state) => {
      const currentTodo = state.todos[id]
      if (currentTodo === undefined) return {}
      return {
        todos: {
          ...state.todos,
          [id]: {
            ...currentTodo,
            completed: !currentTodo.completed,
          },
        },
      }
    }),
  deleteTodo: (id) =>
    set((state) => {
      const { [id]: todo, ...rest } = state.todos
      return {
        todos: rest,
      }
    }),
}))
