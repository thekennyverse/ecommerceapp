const express = require('express');
const server = express();
const database = require('./database');
const port= 4000;

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.get("/userbyid/:id", async (req, res) => {
    const userId = Number(req.params.id);
    console.log(userId)
    const user = await database.findUserById(userId);
    res.send(user);
});

server.get("/userbyusername/:username", async (req, res) => {
    const username = req.params.username;
    const user = await database.findUserByUsername(username);
    res.send(user);
});

server.get("/usersearch/:username", async (req, res) => {
    const username = req.params.username;
    const users = await database.searchUsersByUsername(username);
    res.send(users);
}); 

server.post("/user", async (req, res) => {
    const userData = req.body;
    const username = await database.createUser(userData);
    const user = await database.findUserByUsername(username);
    res.send(user);
});

server.patch("/user", async (req, res) => {
    const newUserData = req.body;
    if (newUserData.user_id == null) throw new Error("Need to provide a user_id in body")
    const originalUserData = await database.findUserById(newUserData.user_id);
    if(originalUserData.length === 0) throw new Error("No user_id with value " + newUserData.user_id);
    const updatedUser = {
        ...originalUserData[0],
        ...newUserData
    }
    console.log("NEW DATA", updatedUser)
    const username = await database.updateUser(updatedUser);
    const user = await database.findUserByUsername(username);
    res.send(user);
});

server.delete("/user/:id", async (req, res) => {
    const userId = Number(req.params.id);
    const user = await database.deleteUserById(userId);
    res.send(user);
});


server.listen(port, () => { console.log("server is running on port 4000");

}) // I made sure server is running correctly in the terminal