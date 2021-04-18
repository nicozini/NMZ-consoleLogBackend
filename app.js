const express   = require('express')
const app       = express()
let  port       = process.env.PORT ;

const productController     = require('./controllers/productController');
const userController        = require('./controllers/userController');
const mainController        = require('./controllers/mainController');

// const path = require('path');
port = port =! undefined ? port = 3030 : port = process.env.PORT;  


app.use(express.static('public'));
app.set('view engine','ejs')


app.listen(port || 3030, () => {
    console.log('VerduMarket Run on port '+ port);
});

// ------ Rutas  ------ //

//Home (index.html)
app.get('/',mainController.home);

//Carrito de compras (productCart.html)
app.get('/productCart',productController.productCart);
//Detalle del producto (productDetail.html)
app.get('/productDetail',productController.productDetail);


//Formulario de registro (register.html)
app.get('/register', userController.register);
//Formulario de login (login.html)
app.get('/login',userController.login);