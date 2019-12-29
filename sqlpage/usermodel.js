//定义数据库的操作函数
const DbBase = require('./dbBase');
class UserModle extends DbBase {

    autologin(id,password,callback) {
        let sql = `select * from users WHERE username = ${id} and pwd = ${password} and admin = 1`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }

    selectview(selectid,selectname,page,callback) {
        var num = (page-1)*10;
        let sql = `SELECT * FROM products,kinds WHERE products.kid=kinds.kid AND pname LIKE '%${selectname}%' AND pid LIKE '%${selectid}%' ORDER BY pid LIMIT ${num},10`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
    deletgonggao(id,callback) {
        let sql = `DELETE FROM notices WHERE nid = '${id}';`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results.affectedRows);
            }
        })
    }
    deletview(id,callback) {
        let sql = `DELETE FROM products WHERE pid = '${id}';`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results.affectedRows);
            }
        })
    }
    getlength(callback) {
        let sql = `SELECT COUNT(pid) FROM products`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
    addgonggao(title,world,time,callback){
        let sql=`INSERT INTO notices(title,content,addtimes) VALUES ('${title}','${world}','${time}')`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results.affectedRows);
            }
        })
    }
    getalllength(callback) {
        let sql = `SELECT COUNT(nid) FROM notices`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
    
    gonggaoviews(page,callback){
        var mypage = 10*(page-1)
        let sql = `SELECT * FROM notices LIMIT ${mypage}, 10`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
    getidview(id,callback){
        let sql = `SELECT * FROM products,kinds WHERE products.kid=kinds.kid AND pid = ${id}`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
    getkinds(callback) {
        let sql = `SELECT * FROM kinds`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results);
            }
        })
    }
    addkinds(value,callback){
        let sql =`INSERT INTO kinds(kidnsname) VALUES ('${value}');`;
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                callback(err);
            } else {
                callback(results.affectedRows);
            }
        })
    }
    addproduce(name,region,price,headimg,imglist,callback){
        let sql=`INSERT INTO products(pname,price,imgsrc,prodetails,kid)
        VALUES ('${name}','${price}','${headimg}','${imglist}','${region}');`
        console.log(sql)
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                console.log(err)
                callback(err);
            } else {
                callback(results.affectedRows);
            }
        })
    }
    changeproduce(id,name,region,price,headimg,imglist,callback){
        let sql=`UPDATE products SET pname = '${name}',price = '${price}',imgsrc= '${headimg}',prodetails = '${imglist}',kid = '${region}'
        WHERE pid = '${id}'`
        this.mydb.query(sql, (err, results, fields) => {
            if (err) {
                console.log(err)
                callback(err);
            } else {
                callback(results.affectedRows);
            }
        })
    }
}
module.exports = UserModle;