import React, { useEffect } from "react";

function CreateCard({ id, setIsCreateCard, fetchCards }) {
  async function CreateCard(name) {
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
            idList: id,
          }),
        };

        const response = await fetch(
          "https://trello-brack.onrender.com/create-card",
          requestOptions
        );
        setIsCreateCard(false);
        fetchCards(id);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="create-card">
      <input
        type="text"
        placeholder="Card name"
        onKeyDown={(event) => {
          event.key === "Enter" && CreateCard(event.target.value);
        }}
      />
    </div>
  );
}

export default CreateCard;
