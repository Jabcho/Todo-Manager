const express = require('express');
const router = express.Router();

const db = require('../database/db');

const path = require('path')
const public_path = path.join(__dirname, '../public')

const crypto = require('crypto');


router.post('/signup', function (req, res) {
    console.log('------------------------------')
    console.log(req)

    const inputPw = req.body.userPw;
    const salt = Math.round((new Date().valueOf() * Math.random())) + "";
    const hashPw = crypto.createHash("sha512").update(inputPw + salt).digest("hex");

    console.log(req.body)

    db.query(`INSERT INTO users (name, userId, hashpw, email, salt) VALUES (?, ?, ?, ?, ?)`, [req.body.name, req.body.userId, hashPw, req.body.email, salt], (err, results) => {
        console.log(results)
        if(err) {
            console.log('사용자 등록 오류');
            console.log(err);
            res.status(400).send(err);
            return
        }

        const url = '/'
        res.status(200).send(url)
    })
})

router.post('/login', function(req, res) {
    
    const userId = req.body.userId;
    const inputPw = req.body.userPw;

    console.log('요청들어옴', req.data)

    
    db.query(`SELECT hashpw, salt FROM users WHERE userId = ?`, [userId], function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return
        }

        const hashPw_ = results[0].hashpw;
        const salt_ = results[0].salt;

        const hashPw2 = crypto.createHash("sha512").update(inputPw + salt_).digest("hex");

        if (hashPw_ === hashPw2) {
            console.log("비밀번호 일치");
            req.session.userId = userId;
            const url = '/main'
            res.status(200).send(url)
        } else {
            console.log("비밀번호 불일치");
            res.sendStatus(401);
        }
    })
});

// 페이지 이동할때가 아니라, 프론트에서 동작할때 사용(목록 추가 등)


router.get('/logout', (req, res) => {
    console.log('로그아웃요청')
    req.session.destroy(function() {
        req.session
    });
    console.log('req.session')
    const url = '/'
    res.status(200).send(url);
})

module.exports = router;