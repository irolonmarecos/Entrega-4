const express = require('express')
const app = express()

const router = require('./routes/account')
app.use(express.static('public'))


app.use(express.json())
app.use(router)

const PORT = process.env.PORT || 2020
const server = app.listen(PORT, ()=>{
    console.log(`El servidor que se esta ejecutando es el ${PORT}`);
})
server.on("error", error => `Error: ${error}`)