const fs=require('fs')

fs.writeFile('./example.txt',"Hello world Surya","utf8",(err)=>{
    if(err){
        console.log(err.message);
    }
    console.log("Data written ...")
})

fs.readFile('./example.txt','utf8',(err,data)=>{console.log("success\n",data)})
