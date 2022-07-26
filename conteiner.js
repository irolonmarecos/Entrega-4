const { error, log } = require("console");
const fs = require("fs");

function calcId (id,dataNuevo){
    if(id == 0 ){
        return 1
    } else{
        return dataNuevo.Productos[dataNuevo.Productos.length - 1].id + 1
    }
}

class Almacen  {
    constructor(product, price, id){
        this.product = product
        this.price = price
        this.id = id  
    }
} 
class container  {
    async getAll(){
        try{
            const data =  fs.readFileSync("./texto.json", "utf-8");
            let dataNuevo = JSON.parse(data)
            return dataNuevo.Productos
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async save(nombre, precio){
        try{
            const data = fs.readFileSync("./texto.json", "utf-8")
            const dataNuevo = JSON.parse(data)
            let Id = dataNuevo.Productos.length
            const nvoProd = new Almacen (nombre,precio,Id)
            nvoProd.id = calcId (nvoProd.id, dataNuevo)
            dataNuevo.Productos.push(nvoProd)
            fs.writeFileSync("./texto.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    }
    async getById (id){
        try{
            const data = fs.readFileSync("./texto.json", "utf-8")
            const dataNuevo = JSON.parse(data)
            let filtro = dataNuevo.Productos.find((el) => el.id === id)
            return filtro;
        } catch(err){
            throw new error ('ERROR')
        }
    }
    async deleteById(id) {
        try{
            const data = fs.readFileSync("./texto.json", "utf-8")
            const dataNuevo = JSON.parse(data)
            const {Productos} = dataNuevo
            let filtro = Productos.filter((el) => el.id !== id)
            dataNuevo.Productos = filtro
            fs.writeFileSync("./texto.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    } 
    async deleteAll() {
        try{
            const data = fs.readFileSync("./texto.json", "utf-8")
            const dataNuevo = JSON.parse(data)
            const {Productos} = dataNuevo
            let borrado = []
            dataNuevo.Productos = borrado
            fs.writeFileSync("./texto.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error ('ERROR')
        }
    } 
    async update(id,prod,pric) {
        try{
            const data = fs.readFileSync("./texto.json", "utf-8")
            const dataNuevo = JSON.parse(data)
            let filtro = dataNuevo.Productos.find((el) => el.id === id)
            filtro.product = prod;
            filtro.price =  pric;
            fs.writeFileSync("./texto.json", JSON.stringify(dataNuevo, null, 2))
        }catch(err){
            throw new error (err)
        }
    } 
} 
module.exports = container

const viewList = new container()

//viewList.update(30)
//mostrarProductos()
//viewList.save()
//viewList.getById (28)
//viewList.deleteById(4)
//viewList.deleteAll()
//viewList.getAll()

