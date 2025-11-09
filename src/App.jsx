import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcome_page.jsx';
import CapsulaTimpului from './pages/capsula_timpului.jsx';
import Pareri from './pages/pareri.jsx';
import LiceulInTimp from './pages/liceulintimp.jsx';
import ThreeD from './pages/threeD.jsx';
import AdminPage from './pages/AdminPage.jsx'; // Importă pagina de administrare

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/capsula-timpului" element={<CapsulaTimpului />} />
      <Route path="/intrebari" element={<Pareri/>} />
      <Route path="/colegiul-de-a-lungul-timpului" element={<LiceulInTimp />} />
      <Route path="/odobescu-3d" element={<ThreeD />} />

      {/* 🔑 RUTA SECRETĂ DE ADMINISTRARE */}
      {/* Accesați manual: /cateluscuparucret */}
      <Route path="/cateluscuparucret" element={<AdminPage />} />
    </Routes>
  );
}

export default App;