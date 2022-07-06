import { Action, Position, State } from '.'
import { config } from '../config'

export const tickReducer = (
  state: State,
  action: Action & { type: 'Tick' }
): State => {
  const lastFrameCount = Math.floor(state.timeStamp / config.msPreFrame)
  const currentFrameCount = Math.floor(action.time / config.msPreFrame)
  const framesToCatchUp = currentFrameCount - lastFrameCount
  const currentFrameTimeStamp = currentFrameCount * config.msPreFrame
  const currentFrameCompletion = action.time - currentFrameTimeStamp

  // this will be run on every frame, so it is better to use a for loop
  let newIdealSnake = state.lastIdealSnake

  for (let i = 0; i < framesToCatchUp; i++) {
    newIdealSnake = steppter(state, newIdealSnake)
  }

  const nextIdealSnake = steppter(state, newIdealSnake)

  // linear interpolation
  const newCurrentSnake = newIdealSnake.map((position, index) => {
    const nextPosition = nextIdealSnake[index]

    if (nextPosition === undefined) return undefined

    const x =
      position.x +
      ((nextPosition.x - position.x) * currentFrameCompletion) /
        config.msPreFrame
    const y =
      position.y +
      ((nextPosition.y - position.y) * currentFrameCompletion) /
        config.msPreFrame
    return { x, y }
  })

  return {
    ...state,
    timeStamp: action.time,
    currentSnake: newCurrentSnake.filter((x): x is Position => x !== undefined),
    lastIdealSnake: newIdealSnake,
  }
}

const steppter = (state: State, snake: State['currentSnake']) => {
  const newSnake = snake.map((position) => {
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
