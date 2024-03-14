import { useEffect, useState } from "react";
import Board from "../components/MainComponents/Boards";
import Nav from "../components/MainComponents/Nav";
import Workspaces from "../components/MainComponents/Workspaces";

export default function Main() {
  const [boards, setBoards] = useState([]);

  const [currentWorkspaceId, setCurrentWorkspaceId] = useState(null);

  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      console.log(i + 1);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token || token === "undefined") {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Nav />
      <Workspaces
        setBoards={setBoards}
        setCurrentWorkspaceId={setCurrentWorkspaceId}
      />
      <Board boards={boards} currentWorkspaceId={currentWorkspaceId} />
    </>
  );
}
