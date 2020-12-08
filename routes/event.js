const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/create', async (req, res, next) => {
    if(req.body.eventName != null
            && req.body.eventDate != null
            && req.body.eventLocation != null
            && req.body.allowedAttendeesCount != null){
        sql = `INSERT INTO events (name, date, location, allowedAttendeesCount)
               VALUES (?, ?, ?, ?);`;
        db.run(sql, [req.body.eventName,
                     req.body.eventDate,
                     req.body.eventLocation,
                     req.body.allowedAttendeesCount], function(err){
            if(err) return next(err);
            else return res.status(200).json({ id: this.lastID });
        });
    } else return next(350);
});

router.get('/list', async (req, res, next) => {
    // currently lists all the events from this day onward
    if(req.body.date != null){
        let sql = `SELECT * FROM events
                   WHERE date > ?;`;
        db.all(sql, [req.body.date], (err, rows) => {
            if(err) return next(err);
            else if(rows.length > 0) return res.status(200).json({ data: rows });
            else return res.status(250).json({ message: "No events found! "});
        });
    } else return next(350);
});

router.delete('/delete', async (req, res, next) => {
    if(req.body.eventId != null){
        let sql = `SELECT id FROM events
                   WHERE id = ?;`;
        db.get(sql, [req.body.eventId], (err, row) => {
            if(err) return next(err);
            else if(row) {
                sql = `DELETE FROM events
                       WHERE id = ?;`;
                db.run(sql, [req.body.eventId], function(err){
                    if(err) return next(err);
                    else return res.status(200).json({ id: this.lastID });
                });
            } else return next(370);
        });
    } else return next(350);
});

module.exports = router;