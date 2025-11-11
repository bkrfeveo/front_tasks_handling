import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskList from './components/TaskList'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route 
              path='/' 
              element={
                <ProtectedRoute>
                  <TaskList />
                </ProtectedRoute>
              }
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
