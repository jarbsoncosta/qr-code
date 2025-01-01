import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Listagem } from './pages/Listagem';

import "./App.css";
import { CameraProvider } from './context/cameraContext';

function App() {
  return (
    <CameraProvider>
      <main className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listagem" element={<Listagem />} />
          </Routes>
        </Router>
      </main>
    </CameraProvider>
  );
}

export default App;

