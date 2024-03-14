import React from 'react';

function EditBoard({setPopUpEditBoard}) {

    async function updateBoard(name) {
        /*let input = document.getElementById("editBoard");*/

        if (name !== "") {
            try {
                let requestOptions = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem("token"),
                        id: localStorage.getItem("board_id"),
                        name: name,
                    }),
                };

                const response = await fetch(
                    "http://localhost:3000/update-board",
                    requestOptions
                );

                /*window.location.href = "/board";*/

            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="edit-board">
            <p>New board name :</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                updateBoard(e.target[0].value);
                setPopUpEditBoard(false);
            }}>
                <input type="text"/>
                <div className="buttons">
                    <button type="submit">Confirm</button>
                    <button onClick={() => setPopUpEditBoard(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditBoard;