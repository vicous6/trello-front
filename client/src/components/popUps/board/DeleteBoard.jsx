import React from "react";

function DeleteBoard({ setPopUpDeleteBoard }) {
  async function deleteBoard() {
    try {
      let requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          id: localStorage.getItem("board_id"),
        }),
      };

      const response = await fetch(
        "https://trello-brack.onrender.com/delete-board",
        requestOptions
      );

      window.location.href = "/main";
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="delete-board">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteBoard();
        }}
      >
        <p>Are you sure ?</p>
        <div className="buttons">
          <button type="submit">Yes</button>
          <button onClick={() => setPopUpDeleteBoard(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteBoard;
