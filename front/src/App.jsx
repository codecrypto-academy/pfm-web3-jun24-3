import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


// Components
import Home from './components/Home';
import About from './components/About';     //Footer
import Privacy from './components/Privacy'; //Footer
import Terms from './components/Terms';     //Footer
import Register from './views/Register';            //View
import Admin from './views/Admin';                  //View
import Agricultor from './views/Agricultor';        //View
import Bodeguero from './views/Bodeguero';          //View
import Transportista from './views/Transportista';  //View
import Vendedor from './views/Vendedor';            //View


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AppContextProvider } from './contexts/AppContext';

function App() {


  return (
    
    <Router>
        <AppContextProvider>
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
              <Route path="/register" element={<Register />} />
              <Route path='*' element={<h3>INVALID ROUTE</h3>} />
            </Route>
          </Routes>
        </AppContextProvider>
    </Router>
  );
}

export default App;