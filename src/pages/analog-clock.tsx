import { useRequestAnimationFrame } from 'hooks/useRequestAnimationFrame'
import React from 'react'

export default function AnalogClock() {
  const [time, setTime] = React.useState(new Date(0))

  useRequestAnimationFrame(() => {
    setTime(new Date())
  })

  return <p>{time.toString()}</p>
}
