import { Action, State } from './'

export const moveSnakeReducer = (
  state: State,
  action: Action & { type: 'MoveSnake' }
): State => {
  return {
    ...state,
    direction: action.direction,
  }
}
