const express = require('express')
const app = express()
const port = process.env.PORT;


const path = require('path');
app.use(express.static('public'));
app.set('view engine','ejs')

app.listen(port || 3030, () => {
    console.log('VerduMarket Run on port '+ port);
});

// ------ Rutas linkeadas ------ //

//Home (index.html)
app.get('/', (req, res) => {
    res.render('index');
});

//Detalle del producto (productDetail.html)
app.get('/views/productDetail.html', (req, res) => {
    res.render('productDetail');
});

//Formulario de registro (register.html)
app.get('/views/register.html', (req, res) => {
    res.render('register');
});

//Formulario de login (login.html)
app.get('/views/login.html', (req, res) => {
    res.render('login');
});

//Carrito de compras (productCart.html)
app.get('/views/productCart.html', (req, res) => {
    res.render('productCart');
});





// ------ Rutas PENDIENTES ------ //

//    ¿Template?
app.get('/template2', (req, res) => {
    res.sendFile(path.join(__dirname, './views/template2.html'));
});