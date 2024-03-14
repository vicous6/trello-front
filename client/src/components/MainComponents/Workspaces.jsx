import React, { useState, useEffect } from "react";
import CreateWorkspace from "../popUps/main/CreateWorkspace";
import EditWorkspace from "../popUps/main/EditWorkspace";
function MainWorkspaces({ setBoards, setCurrentWorkspaceId }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentBoard, setCurrentBoard] = useState([]);

  const [popUpEditWorkspace, setPopUpEditWorkspace] = useState(false);
  const [popUpId, setPopUpId] = useState(null);
  const [popUpText, setPopUpText] = useState(null);

  useEffect(() => {
    async function fetchWorkspace() {
      let token;
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") !== "undefined"
      ) {
        token = localStorage.getItem("token");
      } else {
        console.log("caca");
        token = window.location.href.split("=")[1];
        localStorage.setItem("token", token);
      }
      console.log(token);

      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            id: localStorage.getItem("board_id"),
          }),
        };

        const response = await fetch(
          "http://trello-brack.onrender.com:10000/workspaces",
          requestOptions
        );
        const data = await response.json();
        setWorkspaces(data);
        setCurrentWorkspaceId(data[1].id);
        initCaroussel();
        fetchBoards(document.getElementById("workspacesList").children[1].id);
        // console.log(workspaces);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWorkspace();
  }, []);
  function initCaroussel() {
    let workspaces = document.getElementById("workspacesList").children;
    console.log(workspaces);
    workspaces[0].classList.remove("none");
    workspaces[1].classList.remove("none");
    workspaces[2].classList.remove("none");
    workspaces[0].classList.add("left");
    workspaces[1].classList.add("center");
    workspaces[2].classList.add("right");
    setCurrentBoard(1);
  }
  function moveCaroussel(direction) {
    let workspaces = document.getElementById("workspacesList").children;
    let leftPosition =
      (currentBoard - 1 + workspaces.length) % workspaces.length;
    let rightPosition =
      (currentBoard + 1 + workspaces.length) % workspaces.length;
    let centerPosition = (currentBoard + workspaces.length) % workspaces.length;
    if (direction === "right") {
      // if (currentBoard != 1) {
      workspaces[
        (currentBoard + 2 + workspaces.length) % workspaces.length
      ].classList.remove("none");
      workspaces[
        (currentBoard + 2 + workspaces.length) % workspaces.length
      ].classList.add("right");

      workspaces[centerPosition].classList.add("animation-center-to-left");
      workspaces[leftPosition].classList.add("animation-to-none");
      workspaces[rightPosition].classList.add("animation-right-to-center");
      workspaces[
        (currentBoard + 2 + workspaces.length) % workspaces.length
      ].classList.add("animation-to-display");
      setTimeout(() => {
        workspaces[centerPosition].classList.remove("animation-center-to-left");
        workspaces[leftPosition].classList.remove("animation-to-none");
        workspaces[rightPosition].classList.remove("animation-right-to-center");
        workspaces[
          (currentBoard + 2 + workspaces.length) % workspaces.length
        ].classList.remove("animation-to-display");

        // #################""
        workspaces[rightPosition].classList.remove("right");
        workspaces[rightPosition].classList.add("center");

        console.log(currentBoard);
        workspaces[currentBoard].classList.remove("center");
        workspaces[currentBoard].classList.add("left");

        workspaces[leftPosition].classList.remove("left");
        workspaces[leftPosition].classList.add("none");

        setCurrentBoard(
          (currentBoard + 1 + workspaces.length) % workspaces.length
        );
        console.log();
        console.log(currentBoard);
        fetchBoards(
          workspaces[(currentBoard + 1 + workspaces.length) % workspaces.length]
            .id
        );
        setCurrentWorkspaceId(workspaces[rightPosition].id);
        console.log(workspaces[rightPosition].id);
        console.log("Retardée d'une seconde.");
      }, 500);
    } else if (direction === "left") {
      workspaces[
        (currentBoard - 2 + workspaces.length) % workspaces.length
      ].classList.remove("none");
      workspaces[
        (currentBoard - 2 + workspaces.length) % workspaces.length
      ].classList.add("left");
      workspaces[centerPosition].classList.add("animation-center-to-right");
      workspaces[rightPosition].classList.add("animation-to-none");
      workspaces[leftPosition].classList.add("animation-left-to-center");
      workspaces[
        (currentBoard - 2 + workspaces.length) % workspaces.length
      ].classList.add("animation-to-display");

      setTimeout(() => {
        // ############### remove animations
        workspaces[leftPosition].classList.remove("animation-left-to-center");

        workspaces[
          (currentBoard - 2 + workspaces.length) % workspaces.length
        ].classList.remove("animation-to-display");

        workspaces[centerPosition].classList.remove(
          "animation-center-to-right"
        );
        workspaces[rightPosition].classList.remove("animation-to-none");

        // #################""
        workspaces[rightPosition].classList.remove("right");
        workspaces[rightPosition].classList.add("none");

        workspaces[currentBoard].classList.remove("center");
        workspaces[currentBoard].classList.add("right");

        workspaces[leftPosition].classList.remove("left");
        workspaces[leftPosition].classList.add("center");

        setCurrentBoard(
          (currentBoard - 1 + workspaces.length) % workspaces.length
        );
        setCurrentWorkspaceId(workspaces[leftPosition].id);

        fetchBoards(
          workspaces[
            workspaces[
              (currentBoard - 1 + workspaces.length) % workspaces.length
            ].id
          ].id
        );
        console.log("Retardée d'une seconde.");
      }, 500);
    }
  }

  async function fetchBoards(id, text) {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          id: id,
        }),
      };

      const response = await fetch(
        "http://localhost:3000/getBoardsByOrganisationId",
        requestOptions
      );
      const data = await response.json();
      // console.log(data);
      setBoards(data);
    } catch (error) {
      console.error(error);
    }
  }
  function displayPopUpEdit(id, text) {
    setPopUpId(id);
    setPopUpText(text);
    setPopUpEditWorkspace(true);
  }
  return (
    <div id="MainWorkspaces">
      {/* <h1 id="counter">{currentBoard}</h1> */}
      <button id="left" onClick={() => moveCaroussel("left")}>
        &lt;---
      </button>
      <ul id="workspacesList">
        {workspaces.length ? (
          workspaces.map((workspace) => (
            <li className="none" key={workspace.id} id={workspace.id}>
              <div
                onClick={() =>
                  displayPopUpEdit(workspace.id, workspace.displayName)
                }
              >
                --
              </div>
              <p> {workspace.displayName}</p>
            </li>
          ))
        ) : (
          <p>No Workspaces</p>
        )}
      </ul>
      <button id="right" onClick={() => moveCaroussel("right")}>
        - -&gt;
      </button>
      {popUpEditWorkspace ? (
        <EditWorkspace
          setPopUpEditWorkspace={setPopUpEditWorkspace}
          id={popUpId}
          text={popUpText}
        />
      ) : null}
    </div>
  );
}

export default MainWorkspaces;
