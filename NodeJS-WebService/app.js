


var express = require('express')
var cors = require('cors')
var app = express()
var http = require('http');
var bodyParser = require('body-parser');

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "192.168.99.100",
  user: "root",
  password: "123",
  database: "docker"
});

con.connect(function(err) {
    if (err) throw err;
    else console.log('Database Connected')
});
app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// respond with "hello world" when a GET request is made to the homepage
/* app.get('/home', function (req, res) {
  res.send('hello world')
}); */

app.post('/login', function (req, res) {
    
    console.log(req.body)
        var email = req.body.email;
        var pass = req.body.pass;
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;
           if(result.length<1){
               console.log('Database empty');
               res.status(500).send({ error: 'Database empty' });    
           }
           else{
               var i=0;
               var found = false;
               for(i=0;i<result.length;i++){
                   if(result[i].email==email){
                      
                       found=true;
                       if(result[i].pass==pass){
                                console.log('User Found');
                              
                           console.log('Authentication Successfull');
                           res.status(200).send('User Found\nAuthentication Successfull');                    
                           return;
                       }
                       else{
                        console.log('User Found');
                       
                        console.log('Password Incorrect');
                        res.status(401).send({ error: 'Password Incorrect' });              
                        return;
                       }
                   }
               }
               if(found==false){
                console.log('User Not Found');
                res.status(500).send({ error: 'User Not Found against this email' });  
               }
           }
            
          });
    
      
    });
  

    app.post('/signup', function (req, res) {
    
        console.log(req.body)
            var email = req.body.email;
            var pass = req.body.pass;
            con.query("SELECT * FROM users", function (err, result, fields) {
                if (err) throw err;
               
              
                   var i=0;
                   var found = false;
                   for(i=0;i<result.length;i++){
                       if(result[i].email==email){
                          
                           found=true;
				break;
                          
                       }
                   }
                   if(found==true){
                    console.log('User Already exist');
                    res.status(500).send({ error: 'User already exist against this email' });  
                   }
                   else{
                    var sql = "INSERT INTO users (email, pass) VALUES ('"+email+"', '"+pass+"')";
                    con.query(sql, function (err, result) {
                      if (err) throw err;
                      console.log('Registration Successfull');
                      res.status(200).send('Registration Successful');
                    });
                   }
               
                
              });
        
          
        });
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })
