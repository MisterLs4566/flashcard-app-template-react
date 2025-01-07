"use strict";

const express = require('express');
const db = require('./db/db');

const app = express();
app.use(express.json());
const port = 3000;

const connection = db.createDbConnection();

db.createDbConfiguration(connection);

app.post('/api/insert_flashcard_list', async (req, res) => {
    const title = req.body.title;
    const insertion = await db.insertFlashcardList(connection, title);
    res.json({ message: insertion});
});

app.post('/api/insert_flashcard', async (req, res) => {
    const body = req.body;
    const key_title = body.key_title;
    const key_body = body.key_body;
    const value_title = body.value_title;  
    const value_body = body.value_body;
    const flashcard_list_id = body.flashcard_list_id;
    const insertion = await db.insertFlashcard(connection, key_title, key_body, value_title, value_body, flashcard_list_id);
    res.json({ message: insertion});
});

app.get('/api/flashcard_list', async (req, res) => {
  const rows = await db.getFlashcardList(connection);
  res.json(rows);
});

app.get('/api/flashcard/:flashcard_list_id', async (req, res) => {
    const listId = req.params.flashcard_list_id;
    const rows = await db.getFlashcard(connection, listId);
    res.json({ message : rows });
});      

app.listen(port, () => {        
  console.log(`Server is running on http://localhost:${port}`);
}
);  