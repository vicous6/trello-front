import React from "react";

function DeleteList({ setPopUpDeleteList, id, fetchLists }) {
  async function deleteList() {
    try {
      let requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          id: id,
        }),
      };

      const response = await fetch(
        "https://trello-brack.onrender.com/delete-list",
        requestOptions
      );

      setPopUpDeleteList(false);
      fetchLists();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="delete-list">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteList();
        }}
      >
        <p>Are you sure ?</p>
        <div className="buttons">
          <button type="submit">Yes</button>
          <button onClick={() => setPopUpDeleteList(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteList;
