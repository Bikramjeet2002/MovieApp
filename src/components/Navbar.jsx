import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";

export default function Navbar() {
  const dispatch=useDispatch()
  const navigate= useNavigate()
  const handleLogout=()=>{
    dispatch(logout())
    navigate('/')
  }
  return (
    <div as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to={"/home"}
                  className="bg-violet-500 px-4 py-2 rounded-lg font-bold text-white hover:bg-violet-600"
                >
                  {" "}
                  Home
                </Link>
                <Link  to={"/movies"} className="bg-violet-500 px-4 py-2 rounded-lg font-bold text-white hover:bg-violet-600">
                  {" "}
                  Movies
                </Link>
                <Link
                  to={"/profile"}
                  className="bg-violet-500 px-4 py-2 rounded-lg font-bold text-white hover:bg-violet-600"
                >
                  {" "}
                  Profile
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={handleLogout} className="bg-white p-2 rounded-lg">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
