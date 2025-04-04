import { useState } from 'react'
import './App.css'
import ExcuseForm from "./ExcuseForm.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ExcuseForm name={} reason={} credibility={} date={} creativity={} additionalInfo={} urgency={}/>
    </>
  )
}

export default App
