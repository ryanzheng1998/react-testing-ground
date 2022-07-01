import { useRequestAnimationFrame } from 'hooks/useRequestAnimationFrame'
import React from 'react'

export default function AnalogClock() {
  const [time, setTime] = React.useState(new Date(0))

  useRequestAnimationFrame(() => {
    setTime(new Date())
  })

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hoursDegrees = hours * 30
  const minutesDegrees = minutes * 6
  const secondsDegrees = seconds * 6

  return (
    <div className="grid place-items-center h-screen">
      <div className="grid place-items-center gap-5">
        <h3>{time.toString()}</h3>
        <svg
          className="w-80 aspect-square"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" className="fill-blue-500" />
          {/* hour hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="25"
            stroke="black"
            className="stroke-2"
            style={{
              transform: `rotate(${hoursDegrees}deg)`,
              transformOrigin: '50% 50%',
            }}
          />
          {/* minute hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="10"
            stroke="black"
            className="stroke-2"
            style={{
              transform: `rotate(${minutesDegrees}deg)`,
              transformOrigin: '50% 50%',
            }}
          />
          {/* sencond hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="6"
            stroke="red"
            className="stroke-1"
            style={{
              transform: `rotate(${secondsDegrees}deg)`,
              transformOrigin: '50% 50%',
            }}
          />
          <circle cx="50" cy="50" r="2" />
        </svg>
      </div>
    </div>
  )
}
