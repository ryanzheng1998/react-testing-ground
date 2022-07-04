import { config } from '@page-elements/snake/config'
import { useStore } from '@page-elements/snake/useStore'
import { useEvent } from 'hooks/useEvent'
import { useRequestAnimationFrame } from 'hooks/useRequestAnimationFrame'

export default function Snake() {
  const [state, dispatch] = useStore()

  useEvent('keydown', (e) => {
    const { key } = e

    const keyDirectionMapping = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    } as const

    if (
      key !== 'ArrowUp' &&
      key !== 'ArrowDown' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowRight'
    )
      return

    dispatch({ type: 'MoveSnake', direction: keyDirectionMapping[key] })
  })

  useRequestAnimationFrame((time) => {
    dispatch({ type: 'Tick', time })
  })

  const board = (() => {
    const elements = new Array(config.height).fill(0).map((_, x) => {
      const row = new Array(config.width).fill(0).map((_, y) => {
        const isSnake = state.snake.some((pos) => pos.x === x && pos.y === y)
        const isFood = state.food && state.food.x === x && state.food.y === y

        return (
          <rect
            key={`${x}-${y}`}
            width="0.9"
            height="0.9"
            x={x}
            y={y}
            style={{ fill: isSnake ? 'red' : isFood ? 'green' : '#3b82f6' }}
          />
        )
      })

      return row
    })

    return (
      <svg
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="w-64 aspect-square"
      >
        {elements}
      </svg>
    )
  })()
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-center">Snake Game</h1>
        {board}
      </div>
    </div>
  )
}
