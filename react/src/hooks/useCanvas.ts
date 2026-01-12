import { useEffect, useRef } from 'react'

export function useCanvas(draw: (c: HTMLCanvasElement) => void) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    if (!ref.current) return
    draw(ref.current)
  }, [draw])
  return ref
}
