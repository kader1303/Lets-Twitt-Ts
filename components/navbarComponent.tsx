import userImage from "data-base64:~assets/user.png"
import { useFirebase } from "~firebase/hook"

const NavbarComponent = () => {

  const { user, isLoading, onLogin, onLogout } = useFirebase()

  return (

    <div className="navbar bg-base-200 bg-opacity-95 shadow-lg w-full" style={{ width: 500, borderRadius: 10 }}>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" onClick={() => {
          // Navigate to Home Screen
          window.location.href = "popup.html"
        }}>Let's Twitt</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={userImage} alt="Imagen de usuario" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">Soon</span>
              </a>
            </li>
            <li><a onClick={() => {
              // Navigate to Settings Screen
              window.location.href = "options.html"

            }}>Settings</a></li>
            {
              !user ? (
                <li><a onClick={() => onLogin()}>Login</a></li>
              ) : (
                <li><a onClick={() => onLogout()}>Logout</a></li>
              )
            }  
            {
              isLoading ? (<li className="mt-2"><progress className="progress progress-secondary w-auto h-1/2"></progress></li>) : ""
            }  
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavbarComponent;