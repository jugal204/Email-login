//jshint esversion:6

const express = require("express");
const https = require("https");


const app = express();

app.use(express.static("public"));// static folder
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data ={
        members:
        [
        {
             email_address:email,
             status:"subscribed",
             merge_fields:{
                 FNAME:firstName,
                 LNAME:lastName

             }
              
        }
        ]
    }
    const jsonData  = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/00f88efc85";

    const options = {
        method:"POST",
        auth:"jugal:6f862947437765282267a49f576852f1-us6"
    }

   const request = https.request(url,options,function(response){
       if(response.statusCode===200){
           res.sendFile(__dirname + "/sucess.html");
       }
       else{
        res.sendFile(__dirname + "/failure.html");
       }
        response.on("data",function(data){
            console.log(JSON.parse(data));
            
        });

    });
   
 request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT||3000, function(){
    console.log("server is running on port 3000");
});

//API key
// 6f862947437765282267a49f576852f1-us6

//unique id
// 00f88efc85.