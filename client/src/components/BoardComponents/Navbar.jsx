import React from "react";
import Logo from "../../assets/logo.png";

function Navbar() {
  function logout() {
    localStorage.removeItem("board_id");

    localStorage.removeItem("token");
    window.location.href = `/`;
  }
  return (
    <nav id="MainNav">
      <ul>
        <li>
          <figure>
            <img src={Logo} alt="noted-logo" />
          </figure>
        </li>
        <li>
          <p onClick={() => (window.location.href = "/main")}>Back to Home</p>
        </li>
        <li>
          <a onClick={() => logout()}>Log Out</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
