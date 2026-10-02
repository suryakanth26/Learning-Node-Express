const express = require('express')

const app = express()

app.listen(3000)

app.get('/',(req,res) => {
    // res.send('Hello Surya this is from express SK.')
     console.log("Express Running ",__dirname)

    res.sendFile('./index.html',{root: __dirname})
})

app.get('/status',(req,res) => {
  res.sendFile('./status.html',{root: __dirname})
})

app.get('/about',(req,res) => {
  res.sendFile('./about.html',{root: __dirname})
})
