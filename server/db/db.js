const sqlite3 = require("sqlite3").verbose();
const filepath = "server/db/flashcards.sqlite";

function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  console.log("Connection with SQLite has been established");
  return db;
}

function createDbConfiguration(db) {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS flashcard_list (
      flashcard_list_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL
    )`, (error) => {
      if (error) {
        return console.error(error.message);
      } else {
        console.log("Table flashcard_list created");
      }
    });

    db.run(`CREATE TABLE IF NOT EXISTS flashcard (
      flashcard_id INTEGER PRIMARY KEY AUTOINCREMENT,
      key_title TEXT NOT NULL,
      key_body TEXT NOT NULL,
      value_title TEXT NOT NULL,
      value_body TEXT NOT NULL,
      flashcard_list_id INTEGER,
      FOREIGN KEY (flashcard_list_id) REFERENCES flashcard_list(id)
    )`, (error) => {
      if (error) {
        return console.error(error.message);
      } else {
        console.log("Table flashcards created");
      }
    });
  });
}

async function getFlashcardList(db) {
  return new Promise((resolve, reject) => {
  db.serialize(() => {
    db.all(`SELECT * FROM flashcard_list`, (error, rows) => {
      if (error) {
        reject(error);
      } else {
        console.log("getFlashcardList returns: " + rows);
        resolve({rows:rows});
      }
      console.log(rows);
    });
  });
 });
}

async function getFlashcard(db, list) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(`SELECT flashcard_id, key_title, key_body, value_title, value_body FROM flashcard WHERE flashcard_list_id = ?`, [list], (error, rows) => {
        if (error) {
          console.error(error.message);
          reject(error);
        } else {
          console.log("getFlashcard returns: " + rows);
          resolve({rows:rows});
        }
      });
    });
  })
}

async function insertFlashcardList(db, insertionTitle) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log(`Inserting flashcard list: ${insertionTitle}`);
      db.run("INSERT INTO flashcard_list(title) VALUES(?)", [insertionTitle], function(error) {
        if (error) {
          console.error('Error inserting flashcard list:', error.message);
          reject(error);
        } else {
          console.log(`Flashcard list inserted: ${insertionTitle}`);
          resolve({
            message: "Flashcard list inserted successfully",
            id: this.lastID,
            title: insertionTitle
          });
        }
      });
    });
  });
}

async function insertFlashcard(db, key_title, key_body, value_title, value_body, flashcard_list_id) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      console.log(`Inserting flashcard: ${key_title}, ${key_body}, ${value_title}, ${value_body}, ${flashcard_list_id}`);
      db.run("INSERT INTO flashcard(key_title, key_body, value_title, value_body, flashcard_list_id) VALUES(?, ?, ?, ?, ?)", [key_title, key_body, value_title, value_body, flashcard_list_id], function(error) {
        if (error) {
          console.error('Error inserting flashcard:', error.message);
          reject(error);
        } else {
          console.log(`Flashcard inserted: ${key_title}, ${key_body}, ${value_title}, ${value_body}, ${flashcard_list_id}`);
          resolve({
            message: "Flashcard inserted successfully",
            id: this.lastID,
            key_title: key_title,
            key_body: key_body,
            value_title: value_title,
            value_body: value_body,
            flashcard_list_id: flashcard_list_id
          });
        }
      });
    });
  });
}

module.exports = {
  createDbConnection,
  createDbConfiguration,
  getFlashcardList,
  getFlashcard,
  insertFlashcard,
  insertFlashcardList,
};
