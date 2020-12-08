const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('./db/octo.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) { console.error(err.message); }
    else console.log('Connected to the Octo database.');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      date DATE,
      location TEXT,
      allowedAttendeesCount INTEGER);
      CREATE INDEX eventIDIndex ON events (id);`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT);
      CREATE INDEX userIDIndex ON users (id);
      CREATE INDEX userEmailIndex ON users (email);`);
      
    db.run(`CREATE TABLE IF NOT EXISTS logged (
      userID INTEGER,
      logged INTEGER DEFAULT 0,
      FOREIGN KEY(userID) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE)`);

    db.run(`CREATE TABLE IF NOT EXISTS attend (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventID INTEGER,
      userID INTEGER,
      FOREIGN KEY (userID) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (eventID) REFERENCES events(id) ON UPDATE CASCADE ON DELETE CASCADE);
      CREATE INDEX eventIndex ON users (eventID);`);
});

module.exports = db