// src/App.jsx
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './index.css';
import Carrusel from './components/Carrusel';


function App() {
  return(
    
    <>
      <Navbar />
      <Home />
      <Carrusel />
      
    </>
  );
}

export default App;
