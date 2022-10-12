// import { Modal } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Activpage from './components/Activpage';
import Login from './components/Login';

import Nav from './components/Nav.jsx'
import Home from './components/shortner/Home';
import Signup from './components/Signup';
import Forgotpass from './Forgotpass';
import Passreset from './Passreset';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nav/>}>
        <Route index element={<Login/>}></Route>
        <Route path='signup' element={<Signup/>}></Route>
        <Route path='forgotpass' element={<Forgotpass/>}></Route>
        <Route path='activation' element={<Activpage/>}></Route>
        <Route path='reset-pass' element={<Passreset/>}/>
        
        </Route>
        <Route path="/home" element={<Home/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
