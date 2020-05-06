import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'
// console.log(axios.get)

interface App {
  github: string
}

const App = ({ github }: App) => {
  const [state, setState] = useState(0)
  const btn = useRef<HTMLButtonElement>()

  useEffect(() => {
    btn.current.style.animation = 'shake 2s ease infinite'
  }, [])

  return <div>
    <div className="title">
      <i>TSX Editor</i>
    </div>
    <p style={{ color: 'grey' }}>Fork on Github:
    <br />
      <a href={github} target="_blank">Fronted-TSX-Developer/tsx-editor</a>
    </p>
    <div>
      click to add: {state}
      <div>
        <button ref={btn} onClick={() => setState(state + 1)}>setState(state + 1)</button>
      </div>
    </div>
  </div>
}

ReactDOM.render(<App github="https://github.com/Fronted-TSX-Developer/tsx-editor" />,
  document.getElementById('test'))
