import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import route from './routes/Routes'
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import CallVideoRequestModal from './components/CallVideoRequest/CallVideoRequestModal';
import Page404 from './pages/404Page';

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
            route.routes.map((route) => (
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
          {
            route.routerAdmin.map((route) => (
              <Route key={route.path} 
              path={route.path} 
              element={
                userLocal && userLocal.isAdmin ? 
              <route.element/>
              : <Page404/>
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
