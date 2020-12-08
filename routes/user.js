const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/db');

router.post('/signup', async(req, res, next) => {
    if(req.body.userEmail != null
            && req.body.userPassword != null){
        bcrypt.hash(req.body.userPassword, 10, (err, hashedPassword) => {
            if(err) return next(err);
            else {
                let sql = `SELECT id
                       FROM users
                       WHERE email = ?`;
                db.get(sql, [req.body.userEmail], (err, row) => {
                    if(err) return next(err);
                    else if(row) return next(360);
                    sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
                    db.run(sql, [req.body.userName,
                                req.body.userEmail,
                                hashedPassword], function(err){
                        if(err) return next(500);
                        else {
                            sql = `INSERT INTO logged (userID) VALUES (?)`;
                            db.run(sql, [this.lastID], function(err){
                                if(err) return next(err);
                                else return res.status(200).json({ id: this.lastID });
                            });
                        }
                    });
                });
            }
        });
    } else return next(350);
});

router.post('/signin', async(req, res, next) => {
    if(req.body.userEmail != null
            && req.body.userPassword != null){
        let sql = `SELECT id, password
                    FROM users
                    WHERE email = ?`;
        db.get(sql, [req.body.userEmail], (err, row) => {
            if(err) return next(err);
            else if(row){
                if(bcrypt.compareSync(req.body.userPassword, row.password)){
                    db.run(`UPDATE logged
                            SET logged = 1
                            WHERE userID = ?`, [row.id], function(err){
                        if(err) return next(err);
                        else return res.status(200).json({ id: this.lastID });
                    });
                } else return next(362);
            } else return next(361);
        });
    } else return next(350);
});

router.post('/signout', async(req, res, next) => {
    if(req.body.userEmail != null){
        let sql = `SELECT id
                   FROM users
                   WHERE email = ?`;
        db.get(sql, [req.body.userEmail], (err, row) => {
            if(err) return next(err);
            else if(row){
                sql = `UPDATE logged
                       SET logged = 0
                       WHERE userID = ?`;
                db.run(sql, [row.id], function(err){
                    if(err) return next(err);
                    else return res.status(200).json({ id: this.lastID });
                });
            } else return next(361);
        });
    } else return next(350);
});

router.delete('/delete', async (req, res, next) => {
    if(req.body.userEmail != null
            && req.body.userPassword != null){
        let sql = `SELECT id, password
                   FROM users
                   WHERE email = ?`;
        db.get(sql, [req.body.userEmail], (err, row) => {
            if(err) return next(err);
            else if(row){
                if(bcrypt.compareSync(req.body.userPassword, row.password)){
                    let sql = `DELETE FROM users
                            WHERE email = ?`;
                    db.run(sql, [req.body.userEmail], function(err){
                        if(err) return next(err);
                        else return res.status(200).json({ id: this.lastID });
                    });
                } else return next(362);
            } else return next(361);
        });
    } else return next(350);
});

module.exports = router;
