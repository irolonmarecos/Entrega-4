const express = require('express')
const { use } = require('./routes/account')
const app = express()

const router = require('./routes/account')

app.use(express.json())
app.use(express.static( 'public'))
app.use('/api/productos',router)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, ()=>{
    console.log(`El servidor que se esta ejecutando es el ${PORT}`);
})
server.on("error", error => `Error: ${error}`)