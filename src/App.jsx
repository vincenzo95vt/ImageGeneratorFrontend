import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainComponent from './components/MainComponent/MainComponent'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainComponent/>
    </>
  )
}

export default App
