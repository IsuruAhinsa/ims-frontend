import profileImage from "../../assets/img/undraw_profile.svg";
import { Confirm } from "notiflix";
import "../../AxiosInterceptor";
import axios from "axios";
import Constants from "../../constants/Constants.js";
import { logout } from "../../helpers/helper.js";
import { useEffect, useState } from "react";

const Nav = () => {
  const [branch, setBranch] = useState({});

  const handleLogout = () => {
    Confirm.show(
      "Are you sure?",
      "You will be logged out!",
      "Yes, Logged out",
      "No",
      () => {
        axios
          .post(`${Constants.BASE_URL}/logout`)
          .then(() => {
            logout();
          })
          .catch(() => {
            logout();
          });
      },
    );
  };

  useEffect(() => {
    if (localStorage.branch !== undefined) {
      setBranch(JSON.parse(localStorage.branch));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars" />
      </button>
      {branch != undefined ? branch.company : ""}
      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="mr-2 d-none d-lg-inline text-gray-800 small">
              <span className="d-block text-gray-500">
                Logged in as{" "}
                {localStorage.role_id != undefined
                  ? localStorage.role_id
                  : null}
              </span>
              {localStorage.name != undefined ? localStorage.name : null}
            </div>
            <img className="img-profile rounded-circle" src={profileImage} />
          </a>
          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
              Profile
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
              Settings
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
              Activity Log
            </a>
            <div className="dropdown-divider" />
            <button
              className="dropdown-item"
              data-toggle="modal"
              data-target="#logoutModal"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
