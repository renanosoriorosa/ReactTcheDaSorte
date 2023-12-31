import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRouter from './services/PrivateRouter/PrivateRouter';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Registrar from './pages/Registrar/Registrar';
import './shared/css/Global.css';
import Premios from './pages/Premios/Premios';
import AdminRouter from './services/AdminRouter/AdminRouter';
import Admin from './pages/Admin/Admin';
import SemPermissao from './pages/SemPermissao/SemPermissao';

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRouter><Home/></PrivateRouter>} />
          <Route exact path="/home" element={<PrivateRouter><Home/></PrivateRouter>} />
          <Route exact path="/premios" element={<PrivateRouter><Premios/></PrivateRouter>} />
          <Route exact path="/admin" element={
            <PrivateRouter>
                <AdminRouter><Admin/></AdminRouter>
            </PrivateRouter>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/registrar" element={<Registrar/>} />
          <Route exact path="/SemPermissao" element={<SemPermissao/>} />
          <Route exact path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
