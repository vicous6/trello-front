import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const apiKey = process.env.apiKey;
let baseUrl = "https://api.trello.com/1/";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* WORKSPACE */

// no params
app.post("/workspaces", (req, res) => {
  console.log(req.body);
  const endpoint = `members/me/organizations?key=${apiKey}&token=${req.body.token}`;
  //   console.log(req);
  // let displayName = "coucou";
  // Make a GET re qu es  t to fetch board data

  fetch(`${baseUrl}/${endpoint}`, {
    method: "get",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((workspaces) => {
      let data = [];
      workspaces.forEach((workspace) => {
        data.push({
          id: workspace.id,
          displayName: workspace.displayName,
          name: workspace.name,
        });
      });
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// param : json: {name: string}
app.post("/create-workspaces", (req, res) => {
  let displayName = req.body.name;

  const endpoint = `organizations/?displayName=${displayName}&key=${apiKey}&token=${req.body.token}`;
  //   console.log(req);

  // Make a GET request to fetch board data
  fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      // Iterate over each board and print its name
      console.log("workspace created");
      console.log(data);
      res.json(data.id); // Sending the board data as a response
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {id: string} (id of workspace)
app.delete("/delete-workspace", (req, res) => {
  let id = req.body.id;

  const endpoint = `organizations/${id}?key=${apiKey}&token=${req.body.token}`;

  // Make a GET request to fetch board data
  fetch(`${baseUrl}/${endpoint}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("workspaces deleted ");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {id: string, displayName:string} (id of workspace)
app.put("/update-workspace", (req, res) => {
  let id = req.body.id;
  let displayName = req.body.displayName;

  const endpoint = `organizations/${id}?displayName=${displayName}&id=${id}&key=${apiKey}&token=${req.body.token}`;
  fetch(`${baseUrl}/${endpoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("workspace updated");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

/* BOARD */

// param : json: {id: string}
app.post("/getBoardsByOrganisationId", (req, res) => {
  let id = req.body.id;
  console.log(req.body);
  const boardsEndpoint = `organizations/${id}/boards?key=${apiKey}&token=${req.body.token}`;
  console.log(boardsEndpoint);
  // Make a GET request to fetch board data
  fetch(baseUrl + boardsEndpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((boardsData) => {
      // Iterate over each board and print its name
      // console.log("####################################");
      let data = [];
      boardsData.forEach((board) => {
        console.log(board.name + " qui a l'id: " + board.id);
        data.push({ id: board.id, name: board.name });
      });
      // console.log("####################################");
      // console.log(data);
      res.json(data); // Sending the board data as a response
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {name: string,idOrganization: string}
app.post("/create-board", (req, res) => {
  let name = req.body.name;
  let idOrganization = req.body.idOrganization;
  const endpoint = `boards/?name=${name}&key=${apiKey}&token=${req.body.token}&idOrganization=${idOrganization}`;

  fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("new board created ");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {name: string, idOrganization: string, idBoardSource: string} {idBoardSource = board template to copy}
app.post("/create-board-template", (req, res) => {
  let name = req.body.name;
  let idOrganization = req.body.idOrganization;
  let idBoardSource = req.body.idBoardSource;
  const endpoint = `boards/?name=${name}&key=${apiKey}&token=${req.body.token}&idOrganization=${idOrganization}&idBoardSource=${idBoardSource}&keepFromSource=none&prefs_permissionLevel=org`;

  fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("new board created");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// param : json: {id: string} (id of board)
app.delete("/delete-board", (req, res) => {
  let id = req.body.id;

  const endpoint = `boards/${id}?key=${apiKey}&token=${req.body.token}`;

  fetch(`${baseUrl}/${endpoint}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("board deleted ");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {id: string, name:string} (id of board)
app.put("/update-board", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  console.log(id);
  console.log(name);
  const endpoint = `boards/${id}?name=${name}&id=${id}&key=${apiKey}&token=${req.body.token}`;

  // Make a GET request to fetch board data
  fetch(`${baseUrl}/${endpoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("updated baord");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

/* LIST */

// params : json: {name: string,id : string} (id of board)
app.post("/create-list", (req, res) => {
  let name = req.body.name;
  let id = req.body.id;
  const endpoint = `boards/${id}/lists?name=${name}&key=${apiKey}&token=${req.body.token}`;
  //   console.log(req);
  // Make a GET request to fetch board data
  fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("new list created ");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {id: string} (id of list)
app.put("/delete-list", (req, res) => {
  let id = req.body.id;
  let value = true;

  const endpoint = `lists/${id}/closed?value=${value}&key=${apiKey}&token=${req.body.token}`;

  fetch(`${baseUrl}/${endpoint}`, {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("list deleted ");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {id: string, name:string} (id of workspace)
app.put("/update-list", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  console.log(id);
  console.log(name);
  const endpoint = `lists/${id}?name=${name}&id=${id}&key=${apiKey}&token=${req.body.token}`;

  // Make a GET request to fetch board data
  fetch(`${baseUrl}/${endpoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("updated list");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// param : json: {id : string} (id of board)
app.post("/getListsByBoardId", (req, res) => {
  let id = req.body.id;

  const boardsEndpoint = `boards/${id}/lists?key=${apiKey}&token=${req.body.token}`;
  console.log(boardsEndpoint);
  // Make a GET request to fetch board data
  fetch(baseUrl + boardsEndpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((listsData) => {
      // Iterate over each board and print its name
      console.log("####################################");
      let data = [];
      listsData.forEach((list) => {
        console.log(list.name + " with id: " + list.id);
        data.push({ id: list.id, name: list.name });
      });
      console.log("####################################");

      res.json(data); // Sending the board data as a response
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

/* CARD */

// params : json: {name: string, desc: string, idList: string}
app.post("/create-card", (req, res) => {
  let name = req.body.name;
  let desc = req.body.desc;
  let idList = req.body.idList

  const endpoint = `cards?name=${name}&desc=${desc}&idList=${idList}&key=${apiKey}&token=${req.body.token}`;

  // Make a GET request to fetch board data
  fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("new card created ");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// param : json: {id: string} (id of card)
app.delete("/delete-card", (req, res) => {
  let id = req.body.id;

  const endpoint = `cards/${id}?key=${apiKey}&token=${req.body.token}`;

  fetch(`${baseUrl}/${endpoint}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("card deleted ");
      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// params : json: {id: string, name:string} (id of workspace)
app.put("/update-cards", (req, res) => {
  let id = req.body.id;
  let name = req.body.displayName;

  const endpoint = `cards/${id}?name=${name}&id=${id}&key=${apiKey}&token=${req.body.token}`;

  // Make a GET request to fetch board data
  fetch(`${baseUrl}/${endpoint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("card updated");

      res.json(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

// param : json: {id : string} (id of list)
app.post("/getCardsByListId", (req, res) => {
  let id = req.body.id;
  console.log(id);
  const listsEndpoint = `lists/${id}/cards?key=${apiKey}&token=${req.body.token}`;
  console.log(listsEndpoint);
  // Make a GET request to fetch board data
  fetch(baseUrl + listsEndpoint)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Network response was not ok - Status: ${response.status} ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((cardsData) => {
      // Iterate over each board and print its name
      console.log("####################################");
      let data = [];
      cardsData.forEach((card) => {
        console.log(card.name + " with id: " + card.id);
        data.push({ id: card.id, name: card.name });
      });
      console.log("####################################");

      res.json(data); // Sending the board data as a response
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data from Trello API" });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
