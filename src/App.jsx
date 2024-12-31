// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Listagem } from './pages/Listagem';
import "./App.css"


function App() {
  return (
   <main className='container'>
     <Router>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/listagem" element={<Listagem />} />       
         </Routes>
       </Router>
   </main>
  )
}

export default App
