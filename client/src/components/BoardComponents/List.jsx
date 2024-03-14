import React, {useEffect, useState} from 'react';
import Card from "./Card.jsx";
import NewCard from "./NewCard.jsx";
import CreateCard from "./CreateCard.jsx";
import DeleteList from "../popUps/board/DeleteList.jsx";

function List({name, id, fetchLists}) {

    const [cards, setCards] = useState([]);
    const [listName, setListName] = useState(name)
    const [isCreateCard, setIsCreateCard] = useState(false);
    const [isUpdateList, setIsUpdateList] = useState(false);
    const [popUpDeleteList, setPopUpDeleteList] = useState(false);


    const handleChange = (event) => {
        setListName(event.target.value);
    };

    async function fetchCards(listId) {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({token: localStorage.getItem("token"), id: listId}),
            };

            const response = await fetch(
                "http://localhost:3000/getCardsByListId",
                requestOptions
            );
            const data = await response.json();
            console.log(data);
            setCards(data);
        } catch (error) {
            console.error(error);
            console.log(error);
        }
    }

    async function updateList(newName) {
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
                        id: id,
                        name: newName,
                    }),
                };

                const response = await fetch(
                    "http://localhost:3000/update-list",
                    requestOptions
                );

                setIsUpdateList(false);
                fetchLists();

            } catch (error) {
                console.error(error);
            }
        }
    }

    useEffect(() => {

    fetchCards(id);

}, []);

    return (
        <div className="list">
            <div className="title">
                {isUpdateList ?
                    <input
                        type="text"
                        value={listName}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            event.key === "Enter" && updateList(listName);
                        }}/>
                    :
                    <>
                        <div onClick={() => setIsUpdateList(true)}>
                            {listName}
                        </div>
                        <div onClick={() => setPopUpDeleteList(true)}>
                            ...
                        </div>
                        {popUpDeleteList ? (
                            <DeleteList id={id} fetchLists={fetchLists} setPopUpDeleteList={setPopUpDeleteList}/>
                            ) :
                            null
                        }
                    </>
                }
            </div>
            <div className="cards">
                {cards.length ? cards.map((card) => (
                    <Card key={card.id}  name={card.name} />
                )) : null }
            </div>
            <div>
                {isCreateCard ?
                    <CreateCard id={id} setIsCreateCard={setIsCreateCard} fetchCards={fetchCards}/>
                    :
                    <div onClick={() => setIsCreateCard(true)}>
                        <NewCard />
                    </div>
                }
            </div>
        </div>
    );
}

export default List;