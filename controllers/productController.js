let datosProductos = require('../data/datosProductos'); //en el futuro alamacenaremos nuestros datos aqui


let productControler = {

    list: (req, res) => {
        res.send('Acá la lista de todos los productos');
    },

    productCart:(req,res)=>{    
        console.log('Entro en productCart');
        res.render('products/productCart');
    },

    productDetail:(req,res)=>{
        res.render('products/productDetail', {productDB});
    },

}

module.exports = productControler;