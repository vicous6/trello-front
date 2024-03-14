import React, { useEffect, useState } from "react";
import Navbar from "../components/BoardComponents/Navbar.jsx";
import Options from "../components/BoardComponents/Options.jsx";
import List from "../components/BoardComponents/List.jsx";
import NewList from "../components/BoardComponents/NewList.jsx";

function BoardPage() {
  const [lists, setLists] = useState([]);

  async function fetchLists() {
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

      console.log(localStorage.getItem("token"));
      console.log(localStorage.getItem("board_id"));
      const response = await fetch(
        "https://trello-brack.onrender.com/getListsByBoardId",
        requestOptions
      );
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token || token === "undefined") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="board-page">
      <Navbar />
      <Options />
      <div className="lists">
        {lists.map((list) => (
          <List
            key={list.id}
            id={list.id}
            name={list.name}
            fetchLists={fetchLists}
          />
        ))}
        <NewList fetchLists={fetchLists} />
      </div>
    </div>
  );
}

export default BoardPage;
