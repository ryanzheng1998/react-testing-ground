import React from 'react'
import { useEvent } from './useEvent'

export const useRequestAnimationFrame = (callback: (time: number) => void) => {
  const requestRef = React.useRef<number>()

  const step = (time: number) => {
    callback(time)
    requestRef.current = requestAnimationFrame(step)
  }

  useEvent('load', () => {
    requestRef.current = requestAnimationFrame(step)
    return () => {
      if (requestRef.current === undefined) return
      cancelAnimationFrame(requestRef.current)
    }
  })
}
