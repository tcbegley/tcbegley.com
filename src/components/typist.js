import { useEffect, useState } from 'react'

export default function Typist({ className, text, delay }) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    setTyped('')

    const addChar = (index) => {
      if (index < text.length) {
        setTyped((value) => value + text.charAt(index))
        setTimeout(() => addChar(index + 1), delay)
      }
    }
    const timeoutId = setTimeout(() => addChar(0), delay)
    return () => clearTimeout(timeoutId)
  }, [text, delay])

  return <span className={className}>{typed}</span>
}

Typist.defaultProps = {
  delay: 70,
}
