import { Route, Routes } from 'react-router-dom'
import Home from './component/Home'
import Login from './component/Login'
import Navbar from './component/Navbar'
import ListMovie from './component/ListMovie'
import MovieDetail from './component/movieDetail/movieDetail'



function App() {


  return (
    <div>
  
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/movies" exact element={<ListMovie />} />
        <Route path="/movie/:id" exact element={<MovieDetail />} />

      </Routes>

    </div>
  )
}

export default App
