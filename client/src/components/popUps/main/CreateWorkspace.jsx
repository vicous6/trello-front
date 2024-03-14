import React, { useState } from "react";

function CreateWorkspace({ setPopUpCreateWorkspace }) {
  async function newWorkspace() {
    let input = document.getElementById("createWorspaceName");

    if (input.value !== "") {
      try {
        let requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            name: input.value,
          }),
        };

        const response = await fetch(
          "http://localhost:3000/create-workspaces",
          requestOptions
        );

        window.location.href = "/main";

        // fetchBoards(document.getElementById("workspacesList").children[1].id);
        // console.log(workspaces);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div id="CreateWorkspace">
      <div>
        <button onClick={() => setPopUpCreateWorkspace(false)}>X</button>
        <ul>
          <h1>Create Workspace</h1>
          <li>
            <p>Name</p> <input id="createWorspaceName" type="text" />
          </li>

          <button id="validateCreate" onClick={() => newWorkspace()}>
            Validate
          </button>
        </ul>
      </div>
    </div>
  );
}

export default CreateWorkspace;
