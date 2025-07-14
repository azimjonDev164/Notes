import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const Navbar = ({ activeSideBar }) => {
  const { user, isAuthenticated, error } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="navbar fixed top-0 left-0 right-0 bg-gray-900 text-white shadow-md h-[70px] z-50 px-4">
      {/* Logo or App Name */}
      <div className="block flex-1 md:hidden  ">
        <FontAwesomeIcon
          className="hover:text-yellow-400 text-2xl cursor-pointer"
          onClick={activeSideBar}
          icon={faBars}
        />
      </div>
      <div className="flex-1 hidden md:block">
        <span
          className="text-2xl font-bold cursor-pointer hover:text-yellow-400 transition"
          onClick={() => navigate("/")}
        >
          ✍️ Notes
        </span>
      </div>

      {/* Auth Buttons or Avatar */}
      <div className="flex items-center gap-3">
        {/* Dark mode toggle can go here later */}
        {!isAuthenticated && <LoginButton />}

        {isAuthenticated && !error && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-yellow-400 ring-offset-1 hover:ring-offset-2 transition"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="object-cover"
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-lg bg-gray-800 text-white rounded-box z-50"
            >
              <li>
                <a
                  onClick={() => navigate("/profile")}
                  className="flex justify-between hover:text-yellow-400"
                >
                  Profile
                  <span className="badge bg-yellow-500 text-black">New</span>
                </a>
              </li>
              <li>
                <a className="hover:text-yellow-400">Settings</a>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
