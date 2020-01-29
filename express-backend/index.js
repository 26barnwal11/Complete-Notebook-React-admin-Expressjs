var express = require("express");
const router = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
var mysql = require('mysql');
var session = require('express-session');

const port = process.env.PORT || 3010;

router.use(logger('dev'));

router.use(cors());

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Himanshu@123',
	database : 'notebook'
});
router.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true
}));

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post("/list",function(req,res){
    var title=req.body.title;
    var description=req.body.description;
    if(description!=null && title!=null){
        connection.query('INSERT INTO note(title , description) VALUES (?,?)',[title,description]);
        res.redirect("/list");
    }
    else{
        prompt("Missing Column");
        res.status(404).send([]);
    }
})

router.put("/list/:id",function(req,res){
    var id=parseInt(req.body.id);
    var title=req.body.title;
    var description=req.body.description;
    if(description!=null && title!=null){
        console.log(title+" "+description+"\n");
        connection.query('UPDATE note SET title=?,description=? WHERE id=?',[title,description,id]);
        res.status(200).send([]);
    }
    else{
        prompt("Missing Column");
        res.status(404).send([]);
    }
});

router.delete("/list/:id",function(req,res){
    var id=parseInt(req.params.id);
    connection.query('DELETE FROM note WHERE id=?',id);
    res.status(200).send([]);
})

router.get("/list", function(req,res){
    connection.query('SELECT * FROM note',function(error, results, fields){
        if(results.length > 0){
            try{
                res.setHeader("Access-Control-Expose-Headers", "X-Total-Count");
                res.setHeader("X-Total-Count", results.length);
                res.send(results);
            }
            catch(err){
                res.status(400).json({
                    message: "Some error occured",
                    err
                });
            }
        }
    });
});

router.get("/list/:id", function(req, res){
    let {id} = req.params;
    id = Number(id);
    connection.query('SELECT * FROM note WHERE id=?',id,function(error, results, fields){
        try{
            res.send(results)
        }
        catch(err){
            res.status(400).json({
                message: "Some error occured",
                err
            });
        }
    });
    
});

router.listen(port, function(){
    console.log("Running on "+port);
});

module.exports = router;