import React from 'react'

export interface Position {
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
  snake: [
    { x: 5, y: 3 },
    { x: 4, y: 3 },
    { x: 3, y: 3 },
    { x: 2, y: 3 },
    { x: 1, y: 3 },
    { x: 0, y: 3 },
  ],
  food: null,
  direction: 'right',
}

export type Action =
  | {
      type: 'MoveSnake'
      direction: 'up' | 'down' | 'left' | 'right'
      time: number
    }
  | { type: 'Tick'; time: number }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'MoveSnake':
      return {
        ...state,
        direction: action.direction,
      }
    case 'Tick': {
      const moveSnake = (
        snake: Position[],
        direction: 'up' | 'down' | 'left' | 'right'
      ) => {
        const directionToCoordinate = {
          up: { x: 0, y: -1 },
          down: { x: 0, y: 1 },
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 },
        }

        const coordinate = directionToCoordinate[direction]

        const snakeHead = snake.at(0)

        if (snakeHead === undefined) return []

        const newSnakeHead = {
          x: snakeHead.x + coordinate.x,
          y: snakeHead.y + coordinate.y,
        }

        return [newSnakeHead, ...snake.slice(1)]
      }

      // this is a very simple game. we don't care about the frame skip.
      return {
        ...state,
        timeStamp: action.time,
        snake: moveSnake(state.snake, state.direction),
      }
    }
  }
}

export const useStore = () => {
  return React.useReducer(reducer, initialState)
}
