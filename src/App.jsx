// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Listagem } from './pages/Listagem';


function App() {
  return (
    <Router>
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/listagem" element={<Listagem />} />       
         </Routes>
       </Router>
  )
}

export default App
