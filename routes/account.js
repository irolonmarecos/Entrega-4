const { json } = require('express');
const express = require('express');
const {Router} = express
const Container = require('../conteiner')
const bodyParser = require('body-parser')
const app = express();
const router = Router();
const totalProductos = new Container('./texto.json')
app.use(bodyParser.json())


app.use(express.json())

router.get('/',async (req,res)=>{
    let productos = await totalProductos.getAll()
    res.json(productos)
})

router.get('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const prodId = await totalProductos.getById(id)
    prodId?res.json(prodId):res.status(404).end()
})

router.delete('/:id', async(req,res)=>{
    const id = Number(req.params.id);
    totalProductos.deleteById(id)
    res.status(204).end()
})

router.post('/', async (req,res)=>{
    const nvoProd =  req.body
    console.log(nvoProd);
    const productoAgregado= await totalProductos.save(nvoProd)
    //const pr =   json.nvoProd
    //console.log(pr);
    console.log(productoAgregado);
    res.json(productoAgregado);
    //res.status(200).end()
})

router.put('/:id', async (req,res)=>{
    const id = Number(req.params.id);
    const {product, price} = req.body
    await totalProductos.update(id,product, price)
    res.status(200).end()

}) 



module.exports = router