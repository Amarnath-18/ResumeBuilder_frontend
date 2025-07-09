import { useContext, useEffect } from 'react'
import NavBar from '../components/NavBar'
import { UserContext } from '../context/UserContext'
import { checkAuthStatus } from '../services/apis'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  const {setUser} = useContext(UserContext);
  useEffect(() => {
    const initAuth = async () => {
      const User = await checkAuthStatus();
      if (User) {
        setUser(User)
      } else {
        setUser(null)
      }
    };
    initAuth();
  }, [setUser]);

  return (
    <div>
      <NavBar/>
      <div className='pt-16'>
        <Outlet/>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default Layout