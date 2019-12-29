var express = require('express');
const fs = require('fs');
const UserModel = require('../../sqlpage/usermodel');
const session = require('express-session')

var multer = require('multer');
var path = require('path')
let upload = multer({
    dest: './uploads'
})

var router = express.Router();
router.use('/uploads', express.static(path.join(__dirname, './uploads')))



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

router.post('/autologin', function (req, res) {
    var id = req.body.id;
    var password = req.body.password;
    new UserModel().autologin(id, password, (data1) => {
        if (data1.length == 0) {
            return res.status(200).json({
                ok: 0
            })
        } else {
            return res.status(200).json({
                ok: 1,
                userview: data1
            })
        }
    });
})
router.post('/selectview', function (req, res) {
    var selectname = req.body.selectname;
    var selectid = req.body.selectid;
    var page = req.body.page;
    new UserModel().selectview(selectid, selectname, page, (data1) => {
        return res.status(200).json({
            selectview: data1,
        })
    });
})

router.post('/deletgonggao', function (req, res) {
    var id = req.body.id;
    console.log(id)
    new UserModel().deletgonggao(id, (data1) => {
        return res.status(200).json({
            isok: data1,
        })
    });
})
router.post('/deletview', function (req, res) {
    var id = req.body.id;
    new UserModel().deletview(id, (data1) => {
        return res.status(200).json({
            isok: data1,
        })
    });
})
router.post('/getidview', function (req, res) {
    var id = req.body.id;
    new UserModel().getidview(id,(data1) => {
        return res.status(200).json({
            kindstap: data1,
        })
    });
})
router.post('/getkinds', function (req, res) {
    new UserModel().getkinds((data1) => {
        return res.status(200).json({
            kindstap: data1,
        })
    });
})
router.post('/getlength', function (req, res) {
    new UserModel().getlength((data1) => {
        return res.status(200).json({
            length: data1,
        })
    });
})
router.post('/getalllength', function (req, res) {
    new UserModel().getalllength((data1) => {
        return res.status(200).json({
            length: data1,
        })
    });
})
router.post('/addkinds', function (req, res) {
    var value = req.body.addvalue;
    new UserModel().addkinds(value, (data1) => {
        return res.status(200).json({
            addok: data1,
        })
    });
})
router.post('/addproduce', function (req, res) {
    var name = req.body.name;
    var region = req.body.region;
    var price = req.body.price;
    var headimg = req.body.headimg;
    var imglist = req.body.imglist;
    new UserModel().addproduce(name,region,price,headimg,imglist, (data1) => {
        return res.status(200).json({
            addok: data1,
        })
    });
})
router.post('/addgonggao', function (req, res) {
    var title = req.body.title;
    var world = req.body.world;
    var time = req.body.time;
    new UserModel().addgonggao(title,world,time, (data1) => {
        return res.status(200).json({
            isok: data1,
        })
    });
})
router.post('/gonggaoviews', function (req, res) {
    var page = req.body.page;
    new UserModel().gonggaoviews(page,(data1) => {
        return res.status(200).json({
            gonggaoviews: data1,
        })
    });
})
router.post('/changeproduce', function (req, res) {
    var id = req.body.selectid;
    var name = req.body.name;
    var region = req.body.region;
    var price = req.body.price;
    var headimg = req.body.headimg;
    var imglist = req.body.imglist;
    new UserModel().changeproduce(id,name,region,price,headimg,imglist, (data1) => {
        return res.status(200).json({
            addok: data1,
        })
    });
})
router.post('/upmoremydata', upload.array('file', 9), function (req, res, next) {
    var pics=[];
    req.files.forEach(element => {
        var tap = element.originalname.split('.');
        var a = tap.length;
        var newname = element.filename + '.' + tap[a - 1];
        pics.push(newname);
        fs.rename(`./uploads/${element.filename}`, `./uploads/${newname}`, function (err) {
            if (err) {

            } else {
                return res.status(200).json({
                    names:pics
                })
            }
        })
    });

})

router.post('/getbookkinds', function (req, res) {
    var kw = req.body.kw;
    new UserModel().getbookkinds(kw, (data1) => {
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