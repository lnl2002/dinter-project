import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import routes from './routes/Routes'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {
            routes.map((route) => (
              <Route key={route.path} path={route.path} element={<route.element/>} />
            ))
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
