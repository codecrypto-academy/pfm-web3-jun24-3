import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// Components
import Home from './components/Home';
import About from './components/About';     //Footer
import Privacy from './components/Privacy'; //Footer
import Terms from './components/Terms';     //Footer
import Connect from './components/Connect';
import Register from './components/Register';       //View
import Admin from './views/Admin';                  //View
import Agricultor from './views/Agricultor';        //View
import Bodeguero from './views/Bodeguero';          //View
import Transportista from './views/Transportista';  //View
import Vendedor from './views/Vendedor';            //View

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/about" element={<About />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/agricultor' element={<Agricultor />} />
            <Route path='/bodeguero' element={<Bodeguero />} />
            <Route path='/transportista' element={<Transportista />} />
            <Route path='/vendedor' element={<Vendedor />} />
            <Route path="/connect" element={<Connect account={account} setAccount={setAccount} balance={balance} setBalance={setBalance} />} />
            <Route path="/register" element={<Register account={account} />} />
            <Route path='*' element={<h3>INVALID ROUTE</h3>} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;