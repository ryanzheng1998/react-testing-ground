import { Mapped } from 'type-utils/Mapped'

const config = {
  tileSize: 20,
  width: 20, // unit is tile
  height: 20, // unit is tile
  gameTick: 100, // milseconds
} as const

interface Position {
  x: Mapped<typeof config['width']>[number]
  y: Mapped<typeof config['height']>[number]
}

interface State {
  snake: Position[]
  food: Position
}

export default function Snake() {}
