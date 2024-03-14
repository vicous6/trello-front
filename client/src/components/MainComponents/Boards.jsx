import CreateBoard from "../popUps/main/CreateBoard";
import { useState, useEffect } from "react";

export default function Boards({ boards, currentWorkspaceId }) {
  const [popUpCreateBoard, setPopUpCreateBoard] = useState(false);
  useEffect(() => {
    console.log("id " + currentWorkspaceId);
  }, []);
  const handleBoardClick = (boardId, boardName) => {
    localStorage.setItem("board_id", boardId);
    localStorage.setItem("board_name", boardName);
    window.location.href = `/board`;
  };

  return (
    <div id="MainBaords">
      <ul>
        {boards.length
          ? boards.map((board) => (
              <li
                key={board.id}
                id={board.id}
                onClick={() => handleBoardClick(board.id, board.name)}
                className="animation-to-display"
              >
                <p> {board.name}</p>
              </li>
            ))
          : null}
        <li
          className="animation-to-display"
          onClick={() => setPopUpCreateBoard(true)}
        >
          <p>+</p>
        </li>
        {popUpCreateBoard ? (
          <CreateBoard
            setPopUpCreateBoard={setPopUpCreateBoard}
            // id={popUpId}
            currentWorkspaceId={currentWorkspaceId}
            // text={popUpText}
          />
        ) : null}
      </ul>
    </div>
  );
}
