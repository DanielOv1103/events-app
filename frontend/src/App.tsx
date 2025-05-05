import Home from './pages/Home'
import Events from './pages/Events/Events'
import Create from './pages/Events/Create-Events'
import Exhibitors from './pages/Exhibitors'
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
            <Route path='/exhibitors' element={<Exhibitors />} />
            <Route path='/events/create' element={<Create />} />
            <Route path="/events/edit/:id" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
