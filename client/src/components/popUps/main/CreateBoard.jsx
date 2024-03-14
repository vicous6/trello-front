import React from "react";
import { useState } from "react";

function CreateBoard({ setPopUpCreateBoard, currentWorkspaceId }) {
  // const [idWorksapce, setIdWorkspace] = useState(id);
  const [idTemplate, setIdTemplate] = useState(null);

  async function newBoard() {
    let input = document.getElementById("createBoardName");
    console.log(localStorage.getItem("token"));
    console.log(currentWorkspaceId);
    console.log(input.value);
    console.log(currentWorkspaceId);
    console.log(currentWorkspaceId);
    console.log(currentWorkspaceId);
    if (input.value !== "") {
      if (idTemplate === null) {
        try {
          let requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              idOrganization: currentWorkspaceId,
              name: input.value,
            }),
          };

          const response = await fetch(
            "https://trello-brack.onrender.com/create-board",
            requestOptions
          );

          window.location.href = "/main";

          // fetchBoards(document.getElementById("workspacesList").children[1].id);
          // console.log(workspaces);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          let requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: localStorage.getItem("token"),
              idOrganization: currentWorkspaceId,
              idBoardSource: idTemplate,
              name: input.value,
            }),
          };

          const response = await fetch(
            "http://localhost:3000/create-board-template",
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
  }
  return (
    <div id="CreateBoard">
      <div>
        <button onClick={() => setPopUpCreateBoard(false)}>X</button>
        <ul>
          <h1>Create Board</h1>
          <li>
            <p>Name</p> <input id="createBoardName" type="text" />
          </li>
          <li>
            <p
              className={
                idTemplate === "5e6005043fbdb55d9781821e"
                  ? "focus"
                  : console.log(idTemplate)
              }
              onClick={() => setIdTemplate("5e6005043fbdb55d9781821e")}
            >
              kanban
            </p>
            <p
              className={
                idTemplate === "5c4efa1d25a9692173830e7f"
                  ? "focus"
                  : console.log(idTemplate)
              }
              onClick={() => setIdTemplate("5c4efa1d25a9692173830e7f")}
            >
              conduite de projet
            </p>
          </li>

          <button id="validateCreateBoard" onClick={() => newBoard()}>
            Validate
          </button>
        </ul>
      </div>
    </div>
  );
}

export default CreateBoard;
