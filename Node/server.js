const http = require('http');
const fs = require('fs');


const server = http.createServer((req,res) => {
    console.log("Request Made...\n")

    let path ='.'+req.url+'.html';
    fs.readFile(path,'utf8',(err,data) => {
        if(err){
            res.statusCode =404;
            res.write(err.message);
            res.end();
        }
        else{
            res.statusCode = 200;
            res.write(data);
            res.end();
        }
    } )

})

server.listen(3000,()=> {
    console.log("Server Listening :) ")
})