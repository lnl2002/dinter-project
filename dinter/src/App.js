import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import routes from './routes/Routes'
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import CallVideoRequestModal from './components/CallVideoRequest/CallVideoRequestModal';

function App() {
  const {user, setUser} = useContext(AuthContext);
  useEffect(() => {
    if(localStorage.getItem('User')){
      setUser(JSON.parse(localStorage.getItem('User')));
    }
  }, [])
  const userLocal = JSON.parse(localStorage.getItem('User'));
  console.log(user);
  return (
    <div className="App">
      <ToastContainer />
      <CallVideoRequestModal/>
      <BrowserRouter>
        <Routes>
          {
            routes.map((route) => (
              <Route key={route.path} 
              path={route.path} 
              element={
              userLocal ? 
              <route.element/>
              : <Login/>
              } 
              />
            ))
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
