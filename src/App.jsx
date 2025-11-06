import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome_page'; 
import CapsulaTimpului from './pages/capsula_timpului';
import Pareri from './pages/pareri';
import LiceulInTimp from './pages/liceulintimp';
import ThreeD from './pages/threeD';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/capsula-timpului" element={<CapsulaTimpului />} />
      <Route path="/intrebari" element={<Pareri/>} />
      <Route path="/colegiul-de-a-lungul-timpului" element={<LiceulInTimp />} />
      <Route path="/odobescu-3d" element={<ThreeD />} />
    </Routes>
  );
}

export default App;
