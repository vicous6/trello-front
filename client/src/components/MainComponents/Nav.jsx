import React from "react";
import Logo from "../../assets/logo.png";
import CreateWorkspace from "../popUps/main/CreateWorkspace";
import { useState } from "react";

function Nav() {
  const [popUpCreateWorkspace, setPopUpCreateWorkspace] = useState(false);

  function logout() {
    localStorage.removeItem("board_id");

    localStorage.removeItem("token");
    window.location.href = `/`;
  }
  function toogleSetPopUpCreateWorkspace() {
    if (popUpCreateWorkspace === true) {
      setPopUpCreateWorkspace(false);
    } else {
      setPopUpCreateWorkspace(true);
    }
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
          <p onClick={() => toogleSetPopUpCreateWorkspace()}>
            Create Workspace
          </p>
        </li>
        <li>
          <a onClick={() => logout()}>Log Out</a>
        </li>
      </ul>
      {popUpCreateWorkspace ? (
        <CreateWorkspace setPopUpCreateWorkspace={setPopUpCreateWorkspace} />
      ) : null}
    </nav>
  );
}

export default Nav;
