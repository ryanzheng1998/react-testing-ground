import React from 'react'
import { moveSnakeReducer } from './moveSnakeReducer'
import { tickReducer } from './tickReducer'

interface Position {
  x: number
  y: number
}

export interface State {
  timeStamp: number
  snake: Position[]
  food: Position | null
  direction: 'up' | 'down' | 'left' | 'right'
}

const initialState: State = {
  timeStamp: 0,
  snake: [{ x: 3, y: 3 }],
  food: null,
  direction: 'right',
}

export type Action =
  | { type: 'MoveSnake'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'Tick'; time: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'MoveSnake':
      return moveSnakeReducer(state, action)
    case 'Tick':
      return tickReducer(state, action)
  }
}

export const useStore = () => {
  return React.useReducer(reducer, initialState)
}
