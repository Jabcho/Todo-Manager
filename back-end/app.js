const express = require('express');
const dbroute = require('./routes/dbroute');
const user = require('./routes/users');
const path = require('path')

const app = express();

const db = require('./database/db');
db.connect();

const session = require('express-session');
const fileStore = require('session-file-store')(session);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    session({
        httpOnly: true,
        // secure: true,
        // https 환경에서만 session 정보를 주고 받는다. Node 서버가 프록시 뒤에 있다면 app.use(session({}))을 하기 전에 app.set('trust proxy', 1)을 설정해주는 게 필요하다고 한다.
        key: 'jabchokey',
        secret: '@haJabcho',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 15
            // secure: true,
            // domain, maxAge, expires, path 등의 옵션 설정 
        },
        rolling: true,
        store: new fileStore()
    })
)

app.use('/', express.static(path.join(__dirname, "public")))

/*
app.use('/', (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/main')
    } else{
        next()
    }
})*/

// Test용 ==> 이따가 메인화면으로 변경
app.get('/', function(req, res) {
    console.log(req.session);
    if (req.session.userId) {
        res.redirect('/main')
    }

    res.sendFile(path.join(__dirname, 'public/index.out.html'));
});

app.get('/signup', function(req, res){
    console.log('어휴')
    if (req.session.userId) {
        res.redirect('/main')
    }
    res.sendFile(path.join(__dirname, 'public/signup.out.html'))
})

app.get('/main', function(req, res) {
    if (!req.session.userId) {
        res.status(402).send("<script>alert('사용자 세션이 만료되었습니다');location.href='/';</script>")
    } else {
        console.log('로그인상태')
        res.sendFile(path.join(__dirname, 'public/main.out.html'))
    }
})

// /api 요청 받으면 
app.use('/api/db', dbroute);
app.use('/api/user', user);

app.listen(3000);