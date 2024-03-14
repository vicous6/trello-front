import React, {useState} from 'react';
import EditBoard from "../popUps/board/EditBoard.jsx";
import DeleteBoard from "../popUps/board/DeleteBoard.jsx";

function Options() {

    const [popUpEditBoard, setPopUpEditBoard] = useState(false);
    const [popUpDeleteBoard, setPopUpDeleteBoard] = useState(false);


    return (
        <div className="options">
            <div className="options-title">
                <p>Board name</p>
            </div>
            <div className="options-selection">
                <p onClick={() => setPopUpEditBoard(true)}>Edit</p>
                <p onClick={() => setPopUpDeleteBoard(true)}>Delete</p>
            </div>
            {popUpEditBoard ? (
                <EditBoard setPopUpEditBoard={setPopUpEditBoard} />
            ) : null}
            {popUpDeleteBoard ? (
                <DeleteBoard setPopUpDeleteBoard={setPopUpDeleteBoard} />
            ) : null}
        </div>
    );
}

export default Options;