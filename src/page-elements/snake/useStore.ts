import React from 'react'

export interface Position {
  x: number
  y: number
}

type Direction = 'up' | 'down' | 'left' | 'right'

export interface State {
  timeStamp: number
  snake: Position[]
  food: Position | null
  previousDirection: Direction
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
  food: null,
  previousDirection: 'right',
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
      const distanceToMove = (state.speed * timeDelta) / 1000
      const snakeHead = state.snake.at(0)
      if (snakeHead === undefined) throw new Error('snake head is undefined')
      const remainingDistance = (() => {
        switch (state.previousDirection) {
          case 'up':
            return snakeHead.y % 1
          case 'down':
            return 1 - (snakeHead.y % 1)
          case 'left':
            return snakeHead.x % 1
          case 'right':
            return 1 - (snakeHead.x % 1)
        }
      })()

      const directionToCoordinate = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      }
      const previousCoordinate = directionToCoordinate[state.previousDirection]

      if (remainingDistance > distanceToMove) {
        const newSnake = state.snake.map((position) => {
          return {
            x: position.x + previousCoordinate.x * distanceToMove,
            y: position.y + previousCoordinate.y * distanceToMove,
          }
        })

        return {
          ...state,
          timeStamp: action.time,
          snake: newSnake,
        }
      }

      const distanceToNewDirection = distanceToMove - remainingDistance

      const coordinate = directionToCoordinate[state.direction]

      const newSnake1 = state.snake.map((position) => {
        return {
          x: Math.round(position.x + previousCoordinate.x * remainingDistance),
          y: Math.round(position.y + previousCoordinate.y * remainingDistance),
        }
      })

      const newSnake2 = newSnake1.map((position) => {
        return {
          x: position.x + coordinate.x * distanceToNewDirection,
          y: position.y + coordinate.y * distanceToNewDirection,
        }
      })

      return {
        ...state,
        timeStamp: action.time,
        snake: newSnake2,
        previousDirection: state.direction,
      }
    }
  }
}

export const useStore = () => {
  return React.useReducer(reducer, initialState)
}
