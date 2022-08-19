import { useEffect, useRef, useState } from 'react'

export default function Typist({ className, text, delay }) {
  const index = useRef(0)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let timeoutId = null
    if (index.current < text.length) {
      timeoutId = setTimeout(() => {
        setTyped((value) => value + text.charAt(index.current))
        index.current += 1
      }, delay)
    }
    return () => clearTimeout(timeoutId)
  }, [text, typed, delay])

  return <span className={className}>{typed}</span>
}

Typist.defaultProps = {
  delay: 70,
}
