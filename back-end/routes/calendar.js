const express = require('express');
const router = express.Router();

const db = require('../database/db');

const logincheck = require('../logincheck');

router.get('/getInitialEvents', function(req, res) {
    if (logincheck(req) === 402) {
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
    }
    db.query(`SELECT * FROM calendar where userId = ?`, [req.session.userId], (err, rows) => {
        if (err) {
            console.log(err)
            res.status(400).send(err);
            return
        }
        
        console.log('보내지는 데이터 형태는.. ', rows);
        res.status(200).send(rows);
    })
})

router.post('/addNewEvent', function(req, res) {
    console.log('으잉', req.body)
    if (logincheck(req) === 402) {
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
        return
    }
 
    db.query(`INSERT INTO calendar(title, start, end, userId) VALUES(?, ?, ?, ?)`, [req.body.title, req.body.start, req.body.end, req.session.userId], (err, rows) => {
        console.log('캘린더에서 보낸 요청은: ', req.body)
        console.log('캘린더 세션은?', req.session)
        console.log('db에 추가는 됐나?', rows)
        if (err) {
            res.sendStatus(400);
        }
        
        db.query(`SELECT id, title, start, end FROM calendar WHERE id = '${rows.insertId}'`, (err, rows) => {
            if (err) {
                res.sendStatus(400);
                return
            }
            for (let data of rows) {
                res.status(200).send(data);
            }
        })

    })
})

router.post('/deleteEvent', function(req, res) {
    if (logincheck(req) === 402) {
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
        return
    }

    console.log('요청온놈', req.body)

    db.query(`delete from calendar where id = ?`, [req.body.id], (err, rows) => {
        if (err) {
            res.sendStatus(400);
            return
        }
        res.sendStatus(200);
    })
})

module.exports = router;