
import SignUpForm from './components/Signup' 
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Nav';
import Forget from './components/forget';
import ResetPassword from './components/Reset';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  
  // const router = createBrowserRouter([
    
  //   {
  //     path: '/signup',
  //     element: <SignUpForm/>,
  //   },
  //   {
  //     path: '/login',
  //     element: <Login/>,
  //   },
  //   {
  //     path: '/',
  //     element: <Home/>,
  //   }
   
  // ]);
  return (
    <>
      
      <div style={{width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee"}}
        >
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path={"/signup"} element={<SignUpForm />} />
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/forget"} element={<Forget />} />
                        <Route path={"/reset-password/:token"} element={<ResetPassword />} />
                        
                    </Routes>
                </Router>

        </div>
        
     

    </>
  )
}

export default App
