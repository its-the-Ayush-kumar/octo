const express = require('express');
const router = express.Router();
const db = require('../db/db');

function isAccepting(eventId) {
    return new Promise((resolve, reject) => {
        // getting the current number of attendees
        let sql = `SELECT COUNT(*) as count FROM attend WHERE eventID = ?`;
        db.get(sql, [eventId], function (err, cRow){
            if(err) reject(err);
            else{
                // getting the alllowed number of attendees
                sql = `SELECT allowedAttendeesCount AS count FROM events WHERE id = ?`;
                db.get(sql, [eventId], function (err, tRow){
                    if(err) reject(err);
                    else resolve(tRow.count - cRow.count);
                });
            }
        });
    });
}

router.post('/gotoEvent', async(req, res, next) => {
    if(req.body.userId != null
            && req.body.eventId != null){
        let sql = `SELECT *
                   FROM events
                   WHERE id = ?`;
        db.get(sql, [req.body.eventId], (err, row) => {
            if(err) return next(err);
            else if(row){
                isAccepting(req.body.eventId).then(count => {
                    if(err) return next(err);
                    else if(count) {
                        sql = `INSERT INTO attend (eventID, userID) VALUES (?, ?);`;
                        db.run(sql, [req.body.eventId, req.body.userId], function(err){
                            if(err) return next(err);
                            else return res.status(200).json({ id: this.lastID });
                        });
                    } else return res.status(250).json({ message: 'Event has reached max attendee limit!' });
                }).catch(err => console.log("Hello", err));
            } else return next(370);
        });
    } else return next(350);
});

router.get('/attendees', async (req, res, next) => {
    if(req.body.eventId != null){
        let sql = `SELECT users.id AS id, users.name AS name
                   FROM users, attend
                   WHERE attend.eventID = ?
                   AND attend.userID = users.id;`;
        db.all(sql, [req.body.eventId], (err, rows) => {
            if(err) return next(err);
            else return res.status(200).json({ data: rows });
        });
    } else return res.status(300).json({ error: { message: 'not enough paramters' }});
});

module.exports = router;