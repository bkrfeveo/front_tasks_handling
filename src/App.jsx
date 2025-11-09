import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={<TaskList />}
          />
          <Route 
            path='/connexion' 
            element={<Login />}
          />
          <Route 
            path='/inscription' 
            element={<Register />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
