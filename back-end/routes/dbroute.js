const express = require('express');
const router = express.Router();

const db = require('../database/db');

const logincheck = require('../logincheck');


router.get('/selectAll', function(req, res) {
    if (logincheck(req) === 402) {
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
    }
    console.log('selectAll 요청 들어옴')
    console.log('이제 sessionId 확인하면,', req.session)
    db.query(`SELECT * FROM TODOLIST where userId = ?`, [req.session.userId], (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(400).send(err);
            return
        }
        
        console.log('selectall 요청 결과 : ', rows);
        res.status(200).send(rows);
    })
})

// Front에서 input 받았을 때 넣을 구문
router.post('/insert', function(req, res) {
    if (logincheck(req) === 402) {
        console.log('oepwropiwepoir')
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
    }

    console.log('insert 요청 들어옴, req.body : ', req.body)

    db.query(`INSERT INTO TODOLIST(list, userId) VALUES(?, ?)`, [req.body.list, req.session.userId], (err, rows, fields) => {
        
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return
        };
        
        db.query(`SELECT id, list FROM TODOLIST WHERE id = '${rows.insertId}'`, (err, rows) => {
            if(err) {
                console.log(err)
                res.status(400).send(err);
                return
            }

            for (let data of rows) {
                console.log('새로 추가됐고, 요거 프론트에 보내줌 : ', data)
                res.status(200).send(data);
            }
            
        })
    })
});

// 특정 리스트 삭제
router.post('/delete', (req, res) => {
    if (logincheck(req) === 402) {
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
    }

    db.query(`DELETE FROM TODOLIST WHERE id = ?`, (req.body.id), (err, rows) => {
        console.log(req.body);
        if (err) {
            res.status(400).send(err);
            return
        }

        res.sendStatus(200)
    })
})

// 전체삭제
router.get('/deleteAll', (req, res) => {
    if (logincheck(req) === 402) {
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
    }

    db.query(`DELETE FROM TODOLIST where userId = ?`, [req.session.userId], (err, rows) => {
        if (err) {
            res.status(400).send(err);
            return
        }

        res.sendStatus(200);
    })
    // db.query(`ALTER TABLE TODOLIST AUTO_INCREMENT = 1`);
})

module.exports = router;