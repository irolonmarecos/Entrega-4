const { json } = require('express');
const express = require('express');
const {Router} = express
const Container = require('../conteiner')

const app = express()
const router = Router();
const totalProductos = new Container('./texto.json')

app.use(express.json())

router.get('/api/productos',async (req,res)=>{
    let productos = await req.body
    console.log(productos);
    res.send(`${JSON.stringify(productos)}`)
})

router.get('/api/productos/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const prodId = await totalProductos.getById(id)
    prodId?res.json(prodId):res.status(404).end()
})

router.delete('/api/productos/:id', async(req,res)=>{
    const id = Number(req.params.id);
    totalProductos.deleteById(id)
    res.status(204).end()
})

router.post('/api/productos',  (req,res)=>{
    const nvoProd =  req.body
    console.log(nvoProd);
    res.json(nvoProd);
    //res.status(200).end()
})

router.put('/api/productos/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const {product, price} = req.body
    await totalProductos.update(id,product, price)
    res.status(200).end()

}) 



module.exports = router