import React from 'react'
import { moveSnakeReducer } from './moveSnakeReducer'
import { tickReducer } from './tickReducer'

export interface Position {
  x: number
  y: number
}

export interface State {
  timeStamp: number
  lastIdealSnake: Position[]
  currentSnake: Position[]
  food: Position | null
  direction: 'up' | 'down' | 'left' | 'right'
}

const initialState: State = {
  timeStamp: 0,
  lastIdealSnake: [{ x: 3, y: 3 }],
  currentSnake: [{ x: 3, y: 3 }],
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
