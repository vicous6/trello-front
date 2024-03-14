import React, { useState } from "react";

function NewList({ fetchLists }) {
  const [isCreateList, setIsCreateList] = useState(false);

  async function CreateList(name) {
    /*let input = document.getElementById("editBoard");*/

    if (name !== "") {
      try {
        let requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: localStorage.getItem("token"),
            name: name,
            id: localStorage.getItem("board_id"),
          }),
        };

        const response = await fetch(
          "https://trello-brack.onrender.com/create-list",
          requestOptions
        );
        setIsCreateList(false);
        fetchLists();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="new-list">
      {isCreateList ? (
        <input
          type="text"
          placeholder="List name"
          onKeyDown={(event) => {
            event.key === "Enter" && CreateList(event.target.value);
          }}
        />
      ) : (
        <div className="new-list-header" onClick={() => setIsCreateList(true)}>
          + New list
        </div>
      )}
    </div>
  );
}

export default NewList;
