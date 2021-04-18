let datosProductos = require('../data/datosProductos'); //en el futuro alamacenaremos nuestros datos aqui


let productControler = {
    productCart:(req,res)=>{    
        console.log('Entro en productCart');
        res.render('products/productCart');
    },
    productDetail:(req,res)=>{
        res.render('products/productDetail');
    },

}

module.exports = productControler;