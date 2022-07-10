import React from 'react'

export interface Position {
  x: number
  y: number
}

type Direction = 'up' | 'down' | 'left' | 'right'

export interface State {
  timeStamp: number
  snake: Position[]
  nextSnakeHead: Position
  food: Position
  direction: Direction
  speed: number // unit per second
}

const initialState: State = {
  timeStamp: 0,
  snake: [
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 },
    { x: 2, y: 3 },
    { x: 1, y: 3 },
    { x: 0, y: 3 },
  ],
  nextSnakeHead: { x: 6, y: 3 },
  food: { x: 10, y: 3 },
  direction: 'right',
  speed: 1,
}

export type Action =
  | {
      type: 'MoveSnake'
      direction: Direction
    }
  | { type: 'Tick'; time: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'MoveSnake':
      // the turn will not effect the snake immediately. It will wait until the next tick
      return {
        ...state,
        direction: action.direction,
      }
    case 'Tick': {
      const timeDelta = action.time - state.timeStamp
      const updatePerMs = 1000 / state.speed

      return {
        ...state,
      }
    }
  }
}

export const useStore = () => {
  return React.useReducer(reducer, initialState)
}
