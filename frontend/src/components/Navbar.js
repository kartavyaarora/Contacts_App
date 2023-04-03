import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="navbar navbar-dark bg-dark ">
        <div className="container-fluid text-center">
          <center>
          <div role="button" className="navbar-brand m-2 h1 cursor-pointer">
            Contacts App
            </div>
            </center>
        <nav>
          {user && (
            <div>
              <button className='btn btn-danger' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              
            </div>
          )}
        </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar