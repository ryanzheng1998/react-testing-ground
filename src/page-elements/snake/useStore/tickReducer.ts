import { Action, State } from '.'
import { config } from '../config'

export const tickReducer = (
  state: State,
  action: Action & { type: 'Tick' }
): State => {
  //   const { snake, food, direction } = state
  //   const head = snake[0]
  //   const newHead = {
  //     x: head.x + (direction === 'right' ? 1 : direction === 'left' ? -1 : 0),
  //     y: head.y + (direction === 'down' ? 1 : direction === 'up' ? -1 : 0),
  //   }
  //   const newSnake = [newHead, ...snake.slice(0, -1)]
  //   const newFood =
  //     food === null
  //       ? null
  //       : food.x === newHead.x && food.y === newHead.y
  //       ? null
  //       : food
  //   return { ...state, snake: newSnake, food: newFood }

  if (action.time - state.timeStamp < config.gameTick) return state

  // Cause this is a game there is no need for frame catching
  // const timePass = action.time - state.timeStamp
  // const stepToCatchUp = Math.floor(timePass / config.gameTick)

  const newSnake = step(state)

  return {
    ...state,
    timeStamp: action.time,
    snake: newSnake,
  }
}

const step = (state: State) => {
  const newSnake = state.snake.map((position) => {
    const newPosition = {
      x:
        position.x +
        (state.direction === 'right' ? 1 : state.direction === 'left' ? -1 : 0),
      y:
        position.y +
        (state.direction === 'down' ? 1 : state.direction === 'up' ? -1 : 0),
    }
    return newPosition
  })

  return newSnake
}
