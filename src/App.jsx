import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from "../src/pages/Home.jsx"
import Public from "../src/pages/Public.jsx"
import SignInUp from './pages/SignInUp.jsx';
import Details from './pages/Details.jsx';
function App() {


  return (
    <div className='flex justify-center'>
      <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/public/:uid/:id' element={<Public/>} />
         <Route path='/details/:id' element={<Details/>}/>
         <Route path='/sign' element={<SignInUp/>} />
       </Routes>
    </div>
  )
}

export default App
