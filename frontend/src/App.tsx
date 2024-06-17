
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Blog from './pages/Blog'

function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/blog' element = {<Blog></Blog>}></Route>
          <Route path='/signin' element = {<Signin/>}></Route>
          <Route path='/signup' element = {<Signup/>}></Route>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
