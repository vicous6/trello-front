import React, { useState } from "react";

function EditWorkspace({ setPopUpEditWorkspace, id, text }) {
  const [idWorksapce, setIdWorkspace] = useState(id);
  console.log(text);
  async function editWorkspace() {
    let input = document.getElementById("editWorspaceName");

    if (input.value !== "") {
      try {
        let requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            id: idWorksapce,
            displayName: document.getElementById("editWorspaceName").value,
          }),
        };

        const response = await fetch(
          "https://trello-brack.onrender.com/update-workspace",
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
  async function deleteWorkspace() {
    // let input = document.getElementById("editWorspaceName");

    // if (input.value !== "") {
    try {
      let requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          id: idWorksapce,
          // displayName: document.getElementById("editWorspaceName").value,
        }),
      };

      const response = await fetch(
        "https://trello-brack.onrender.com/delete-workspace",
        requestOptions
      );

      window.location.href = "/main";

      // fetchBoards(document.getElementById("workspacesList").children[1].id);
      // console.log(workspaces);
    } catch (error) {
      console.error(error);
    }
    // }
  }

  return (
    <div id="EditWorkspace">
      <div>
        <button onClick={() => setPopUpEditWorkspace(false)}>X</button>
        <ul>
          <li>
            <p>New Name</p>
            <input id="editWorspaceName" type="text" defaultValue={text} />
          </li>
          <li>
            <button onClick={() => deleteWorkspace()}>Delete</button>

            <button id="validateEdit" onClick={() => editWorkspace()}>
              Validate
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EditWorkspace;
