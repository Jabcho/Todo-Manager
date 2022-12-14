
const logincheck = (req) => {
    console.log('logincheck req: ', req.session)
    if (!req.session.userId) {
        return 402
    } else {
        return 200
    }
}

module.exports = logincheck;
