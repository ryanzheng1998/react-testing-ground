import { config } from '@page-elements/snake/config'
import { useStore } from '@page-elements/snake/useStore'
import { useEvent } from 'hooks/useEvent'
import { useRequestAnimationFrame } from 'hooks/useRequestAnimationFrame'

// change snake move from discrete to continuous

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
    const snake = state.currentSnake.map((position, index) => {
      return (
        <rect
          key={index}
          width="1"
          height="1"
          x="0"
          y="0"
          className="fill-blue-400"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        />
      )
    })
    return (
      <svg
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="w-64 aspect-square"
      >
        <rect width="100%" height="100%" className="fill-slate-200" />
        {snake}
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
