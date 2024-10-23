import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; //agrego esto porque me esta dando error. creo que lo vimos en el respaso de 22/10 pero no estoy segura.
import App from './App.jsx';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> {/*este es el que llama a approutes y este a lo que estaba aca antes.  */}
    </BrowserRouter>,
  </StrictMode>
); 
