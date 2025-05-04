import Home from './pages/Home'
import Events from './pages/Events'
import Person from './pages/Persons'
import Layout from './pages/layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path='/persons' element={<Person />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
