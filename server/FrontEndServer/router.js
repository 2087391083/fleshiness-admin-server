var express = require('express');
const fs = require('fs');
const UserModel = require('../../sqlpage/usermodel');
const session = require('express-session')

var router = express.Router();

let secret = 'com.mydomain.app.h519061';

//设置session
router.use(session({
    saveUninitialized: true,
    secret: secret,
    resave: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }, //cookie设置过期时间
}))
// var peopleviews = req.session.peopleviews;//获取session
// req.session.peopleviews = results.haveit;//设置session

router.get('/getview', function (req, res) {
    console.log(req.query)
    
})

router.post('/getbookkinds', function (req, res) {
    var kw=req.body.kw;
    new UserModel().getbookkinds(kw,(data1) => {
        return res.status(200).json({
            bookkinds: data1,
        })
    });
})

//页面刷新
// router.get('/loginout', function (req, res) {
//     req.session.destroy();
//     res.redirect('/');
// })



module.exports = router